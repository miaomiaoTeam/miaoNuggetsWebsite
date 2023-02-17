import { access_redis, refresh_redis } from 'server-utils/redis'

export default defineEventHandler(async event => {
  const { $token } = event.context
  const access_token = await refresh_redis.hget($token, 'access_token')
  if (access_token) await access_redis.del(access_token)
  await refresh_redis.del($token)
  return {
    code: 0,
    message: 'OK',
  } as const
})
