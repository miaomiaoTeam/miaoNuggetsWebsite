export default defineEventHandler(async () => {
  const tabs = await query<DB.TabsLabelList>('select * from tabs_label_list')
  return {
    code: 0,
    message: 'OK',
    data: dataToJson.tabs(tabs),
  } as const
})
