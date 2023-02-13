import { query } from 'server-utils/mysql'

export default defineEventHandler(async () => {
  const data = await query<DB.FollowLabelList>(
    'select * from follow_label_list'
  )
  for (const tab of data) {
    tab.is_show = !!tab.is_show
  }
  return {
    code: 0,
    message: 'OK',
    data,
  } as const
})
