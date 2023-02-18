export default defineEventHandler(async () => {
  const categorys = await query<DB.CategoryList>('select * from category_list')
  return {
    code: 0,
    message: 'OK',
    data: dataToJson.categorys(categorys),
  } as const
})
