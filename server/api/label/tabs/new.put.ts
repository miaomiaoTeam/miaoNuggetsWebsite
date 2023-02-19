export default defineEventHandler(async event => {
  const {
    label,
    route,
    link = '',
    badge = '',
    is_show = true,
    in_menu = true,
  } = await readBody<RQ.NewTabsLabelPut>(event)
  const { insertId } = await query(
    'insert into tabs_label_list ' +
      '(label,route,link,badge,is_show,in_menu) ' +
      'values (?,?,?,?,?,?)',
    [label, route, link, badge, is_show ? 1 : 0, in_menu ? 1 : 0]
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
