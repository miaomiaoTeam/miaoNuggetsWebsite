import { access_redis } from 'server-utils/redis'

export default defineEventHandler(async event => {
  const { $token } = event.context
  const exist = !!(await access_redis.exists($token))
  const ttl = exist ? await access_redis.ttl($token) : 0
  return {
    code: 0,
    message: 'OK',
    data: { exist, ttl },
  } as const
})
