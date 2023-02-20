import { isObject } from '@vueuse/core'
import { admin_list, white_list } from 'server-config/authentication'
import { access_redis } from 'server-utils/redis'

declare module 'h3' {
  interface H3EventContext {
    $token: string
    $userinfo: Omit<DB.UserList, 'password'>
    $admininfo: Omit<DB.AdminList, 'password'>
  }
}

export default defineEventHandler(async event => {
  console.log('New request: ' + event.node.req.url)
  const url = event.node.req.url?.split('?')[0]
  if (url?.startsWith('/api')) {
    if (url.startsWith('/api/_content')) return
    const token = getHeader(event, 'authentication')
    event.context.$token = token!
    const userinfo = token
      ? // @ts-ignore
        ((await access_redis.hgetall(token)) as Client.UserInfo)
      : undefined
    if (userinfo) {
      // @ts-ignore
      userinfo.id = Number(userinfo.id)
      if (userinfo.role === 'admin') event.context.$admininfo = userinfo
      else if (userinfo.role === 'none' || userinfo.role === 'author')
        event.context.$userinfo = userinfo
    }
    if (white_list.has(url)) return
    if (!token || typeof token !== 'string')
      throw createError({
        statusCode: 401,
        statusMessage: 'unauthorized',
        message: '未通过验证的访问',
      })
    const { $userinfo, $admininfo } = event.context
    if ($admininfo && isObject($admininfo) && 'id' in $admininfo) return
    if ($userinfo && isObject($userinfo) && 'id' in $userinfo) {
      if (admin_list.has(url))
        throw createError({
          statusCode: 403,
          statusMessage: 'nopermission',
          message: '没有足够的权限访问',
        })
      else return
    }
    throw createError({
      statusCode: 401,
      statusMessage: 'unauthorized',
      message: '未通过验证的访问',
    })
  }
})
