export default defineEventHandler(async event => {
  const { username, password } = await readBody<RQ.SignInPost>(event)
  const [user] = dataToJson.users(
    await query<DB.UserList>(
      'select * from user_list where username=? and password=? limit 1',
      [username, password]
    )
  )
  if (!user)
    return {
      code: 12000,
      message: '用户名或密码错误',
    } as const
  console.log(user)
  // @ts-ignore
  delete user.password
  const access = await createToken(
    access_redis,
    jsonToData(user),
    7 * 24 * 3600
  )
  const refresh = await createToken(
    refresh_redis,
    {
      access_token: access.value,
      user_id: user.id,
    },
    28 * 24 * 3600
  )
  return {
    code: 0,
    message: 'OK',
    data: { access, refresh } as Client.UserToken,
  } as const
})
