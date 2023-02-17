import { query } from 'server-utils/mysql'
import { dataToJson } from 'server-utils/format'

export default defineEventHandler(async () => {
  const users = await query<DB.UserList>('select * from user_list')
  return {
    code: 0,
    message: 'OK',
    data: dataToJson.users(users),
  } as const
})
