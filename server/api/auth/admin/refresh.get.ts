import { query } from 'server-utils/mysql'
import { access_redis, refresh_redis, createToken } from 'server-utils/redis'

export default defineEventHandler(async event => {
  const { $token } = event.context
  const { access_token, user_id } = await refresh_redis.hgetall($token)
  if (access_token) await access_redis.del(access_token)
  const [admin] = await query<Omit<DB.AdminList, 'password'>>(
    'select id,create_time,update_time,username,nickname,role' +
      ' from admin_list where id=? limit 1',
    [user_id]
  )
  if (!admin)
    throw createError({
      statusCode: 500,
      statusMessage: 'Redis Storage Error',
      message: 'Redis存储错误，请重新登录',
    })
  const access = await createToken(access_redis, admin, 7 * 24 * 3600)
  const refresh =
    (await refresh_redis.ttl($token)) < 7 * 24 * 3600
      ? (await refresh_redis.del($token),
        await createToken(
          refresh_redis,
          {
            access_token: access.value,
            user_id: admin.id,
          },
          14 * 24 * 3600
        ))
      : undefined

  return {
    code: 0,
    message: 'OK',
    data: { access, refresh },
  } as const
})
