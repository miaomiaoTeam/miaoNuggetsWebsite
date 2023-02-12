import { query } from 'server-utils/mysql'

export default defineEventHandler(async () => {
  const data = await query<DB.TabsLabelList>('select * from tabs_label_list')
  for (const tab of data) {
    tab.is_show = !!tab.is_show
    tab.in_menu = !!tab.in_menu
  }
  return {
    code: 0,
    message: 'OK',
    data,
  } as const
})
