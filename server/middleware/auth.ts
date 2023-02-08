import { isObject } from '@vueuse/core'
import { white_list } from 'server-config/white_list'
import { access_redis } from 'server-utils/redis'

declare module 'h3' {
  interface H3EventContext {
    $token: string
    $userinfo: Client.UserInfo
  }
}

export default defineEventHandler(async event => {
  console.log('New request: ' + event.node.req.url)
  const url = event.node.req.url?.split('?')[0]
  if (url?.startsWith('/api')) {
    const token = getHeader(event, 'authentication')
    event.context.$token = token!
    if (white_list.has(url)) return
    if (!token || typeof token !== 'string')
      throw createError({
        statusCode: 401,
        statusMessage: 'unauthorized',
        message: '未通过验证的访问',
      })
    // @ts-ignore
    const userinfo: Client.UserInfo = await access_redis.hgetall(token)
    if (!userinfo || !isObject(userinfo) || !('id' in userinfo))
      throw createError({
        statusCode: 401,
        statusMessage: 'unauthorized',
        message: '未通过验证的访问',
      })

    // @ts-ignore
    userinfo.id = Number(userinfo.id)
  }
})
