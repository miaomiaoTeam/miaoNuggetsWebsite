export default defineEventHandler(async event => {
  const { $token } = event.context
  const { access_token, user_id } = await refresh_redis.hgetall($token)
  if (access_token) await access_redis.del(access_token)
  const [user] = dataToJson.users(
    await query<DB.UserList>(
      'select id,create_time,update_time,username,nickname,role' +
        ' from user_list where id=? limit 1',
      [user_id]
    )
  )
  if (!user) {
    refresh_redis.del($token)
    throw createError({
      statusCode: 500,
      statusMessage: 'Redis Storage Error',
      message: 'Redis存储错误，请重新登录',
    })
  }
  // @ts-ignore
  delete user.password
  const access = await createToken(access_redis, user, 7 * 24 * 3600)
  const refresh =
    (await refresh_redis.ttl($token)) < 7 * 24 * 3600
      ? (await refresh_redis.del($token),
        await createToken(
          refresh_redis,
          {
            access_token: access.value,
            user_id: user.id,
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
