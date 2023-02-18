export default defineEventHandler(async event => {
  const {
    label,
    alias,
    icon,
    is_show = true,
  } = await readBody<RQ.NewCategoryPut>(event)
  const { insertId } = await query(
    'insert into category_list ' +
      '(label,alias,icon,is_show) ' +
      'values (?,?,?,?)',
    [label, alias, icon, is_show ? 1 : 0]
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
