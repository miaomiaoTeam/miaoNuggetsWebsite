import { query } from 'server-utils/mysql'

export default defineEventHandler(async () => {
  const result = await query<{}>('select * from empty_list')
  throw createError({
    statusCode: 401,
    data: result,
  })
})
