export default defineEventHandler(async () => {
  const tags = await query<DB.FollowLabelList>(
    'select * from follow_label_list'
  )
  return {
    code: 0,
    message: 'OK',
    data: dataToJson.tags(tags),
  } as const
})
