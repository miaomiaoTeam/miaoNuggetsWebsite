import chalk from 'chalk'
import type { NuxtError } from '#app/composables'
import type { FetchOptions } from 'ofetch'
import { useAccount } from 'stores/account'

export default defineNuxtPlugin(() => {
  const IS_DEV = process.dev

  const originFetch = $fetch.create({
    credentials: 'omit',
    onRequest(ctx) {
      if (IS_DEV) {
        console.group(`${chalk.yellow('fetch请求')} ${chalk.grey(ctx.request)}`)
        console.log(`${chalk.green('请求方式')}: `, ctx.options.method)
        console.groupCollapsed(chalk.green('请求头'))
        for (const [key, val] of new Headers(ctx.options.headers).entries()) {
          console.log(`${chalk.blue(key)}:`, val)
        }
        console.groupEnd()
        console.log(`${chalk.blue('params')}:`, ctx.options.params)
        if (!ctx.options.method || ctx.options.method === 'get') {
          if (ctx.options.query) {
            console.group(chalk.green('携带参数'))
            for (const [key, val] of Object.entries(ctx.options.query)) {
              console.log(`${chalk.blue(key)}:`, val)
            }
            console.groupEnd()
          }
        } else if (ctx.options.body) {
          console.group(chalk.green('携带值'))
          for (const [key, val] of Object.entries(ctx.options.body)) {
            console.log(`${chalk.blue(key)}:`, val)
          }
          console.groupEnd()
        }
        console.groupEnd()
      }
    },
    onResponse(ctx) {
      if (IS_DEV) {
        console.group(
          `${chalk.yellow('fetch响应')} ${chalk.grey(
            (ctx.request as string).split('?')[0]
          )}`
        )
        console.groupCollapsed(chalk.green('响应头'))
        for (const [key, val] of ctx.response.headers) {
          console.log(`${chalk.blue(key)}:`, val)
        }
        console.groupEnd()
        console.group(`${chalk.green('响应码')}:`, ctx.response.status)
        if (ctx.response.status !== 200) {
          console.log(`${chalk.blue('statusText')}:`, ctx.response.statusText)
        }
        console.groupEnd()
        if (ctx.response._data) {
          if (typeof ctx.response._data === 'object') {
            console.group(chalk.green('响应值'))
            for (const [key, val] of Object.entries(ctx.response._data)) {
              console.log(`${chalk.blue(key)}:`, val)
            }
            console.groupEnd()
          } else console.log(`${chalk.green('响应值')}:`, ctx.response._data)
        }
        console.groupEnd()
      }
    },
  })

  const refresh_lock = ref(false)
  const request_cache = reactive(new Set<(token: string) => void>())

  const requests_bucket = reactive(
    new Map<
      string,
      { resolve: Set<(res: any) => void>; reject: Set<(res: any) => void> }
    >()
  )

  Object.defineProperty(window, '$fetch', {
    configurable: true,
    enumerable: true,
    get() {
      return (request: string, opts: FetchOptions = {}) => {
        return new Promise((resolve, reject) => {
          if (!request.startsWith('/api'))
            return resolve(originFetch(request, opts))

          const request_key = request + JSON.stringify(opts)
          let responses = requests_bucket.get(request_key)
          if (responses) {
            responses.resolve.add(resolve)
            responses.reject.add(reject)
            return
          }
          responses = {
            resolve: new Set([resolve]),
            reject: new Set([reject]),
          }
          requests_bucket.set(request_key, responses)
          let pedding = true
          resolve = (value: unknown) => {
            if (!responses?.resolve.size || !pedding) return
            const _responses = Array.from(responses.resolve)
            console.warn('执行列表', _responses.length)
            requests_bucket.delete(request_key)
            for (const resolve of _responses) {
              resolve(value)
            }
            pedding = false
          }
          reject = (reason?: any) => {
            if (!responses?.reject.size || !pedding) return
            const _responses = Array.from(responses.reject)
            console.error('执行列表', _responses.length)
            ElMessage.error(
              reason.message ?? reason.statusMessage ?? '请求错误'
            )
            requests_bucket.delete(request_key)
            for (const reject of _responses) {
              reject(reason)
            }
            pedding = false
          }

          if (opts.params && typeof opts.params === 'object') {
            for (const [key, val] of Object.entries(opts.params)) {
              if (['string', 'number'].includes(typeof val))
                request = request.replaceAll(`:${key}`, String(val))
            }
            delete opts.params
          }

          const go_login = async (reason?: any) => {
            const route = useRoute()
            if (route.path !== '/')
              await navigateTo(
                { path: '/', query: { redirect: route.fullPath } },
                { replace: true }
              )
            reject(reason)
          }
          if (request === '/api/auth/admin/refresh')
            return originFetch(request, opts).then(resolve, go_login)
          const setToken = (token?: string) => {
            if (!token) return
            if (opts.headers instanceof Headers) {
              opts.headers.set('Authentication', token)
            } else if (Array.isArray(opts.headers)) {
              opts.headers.push(['Authentication', token])
            } else {
              if (!opts.headers) opts.headers = {}
              opts.headers.Authentication = token
            }
          }
          if (refresh_lock.value)
            return request_cache.add(token => {
              setToken(token)
              originFetch(request, opts).then(resolve, reject)
            })
          const account = useAccount()
          setToken(account.access_token)
          const resolvent = async (err: NuxtError) => {
            if (err.statusCode === 401) return await refresh(err)
            reject(err)
          }
          const refresh = async (err: NuxtError) => {
            try {
              if (refresh_lock.value)
                return request_cache.add(token => {
                  setToken(token)
                  originFetch(request, opts).then(resolve, reject)
                })
              refresh_lock.value = true
              if (account.refresh_token) {
                const result = await account.refreshToken()
                if (!result) return go_login()
                const { access } = result
                const _requestsCache = Array.from(request_cache)
                request_cache.clear()
                refresh_lock.value = false
                for (const request of _requestsCache) {
                  request(access.value)
                }
                setToken(access.value)
                originFetch(request, opts).then(resolve, reject)
              } else {
                refresh_lock.value = false
                await go_login(err)
              }
            } catch (e) {
              refresh_lock.value = false
              request_cache.clear()
              ElMessage.error(err.message)
              reject(err)
            }
          }
          originFetch(request, opts).then(resolve, resolvent)
        })
      }
    },
  })
})
