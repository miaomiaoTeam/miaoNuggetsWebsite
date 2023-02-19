export default defineEventHandler(async () => {
  const ads = await query<DB.ADList>('select * from ad_list')
  return {
    code: 0,
    message: 'OK',
    data: dataToJson.ads(ads),
  } as const
})
