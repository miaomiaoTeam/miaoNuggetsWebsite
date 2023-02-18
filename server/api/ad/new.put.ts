export default defineEventHandler(async event => {
  const {
    cover_image,
    link,
    is_show = true,
  } = await readBody<RQ.NewADPut>(event)
  const { insertId } = await query(
    'insert into ad_list ' + '(cover_image,link,is_show) ' + 'values (?,?,?)',
    [cover_image, link, is_show ? 1 : 0]
  )
  const timestamp = new Date()
  if (!insertId) throw new Error('数据库修改错误')
  return {
    code: 0,
    message: 'OK',
    data: {
      id: insertId,
      create_time: timestamp,
      update_time: timestamp,
    },
  } as const
})
