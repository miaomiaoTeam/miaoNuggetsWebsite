export default defineEventHandler(async event => {
  const { username, password } = await readBody<RQ.SignInPost>(event)
  const [admin] = await query<Omit<DB.AdminList, 'password'>>(
    'select id,create_time,update_time,username,nickname,role' +
      ' from admin_list where username=? and password=? limit 1',
    [username, password]
  )
  if (!admin)
    return {
      code: 12000,
      message: '用户名或密码错误',
    } as const
  console.log(admin)
  const access = await createToken(access_redis, admin, 7 * 24 * 3600)
  const refresh = await createToken(
    refresh_redis,
    {
      access_token: access.value,
      user_id: admin.id,
    },
    28 * 24 * 3600
  )
  return {
    code: 0,
    message: 'OK',
    data: { access, refresh } as Client.UserToken,
  } as const
})
