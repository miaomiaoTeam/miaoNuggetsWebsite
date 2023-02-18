export default defineEventHandler(async event => {
  const id = getQuery(event).id as string
  const [article] = await query<DB.ArticleList>(
    'select * from article_list where id=? limit 1',
    [id]
  )
  if (!article)
    return {
      code: 21000,
      message: '找不到指定文章',
    } as const
  return {
    code: 0,
    message: 'OK',
    data: dataToJson.article(article),
  } as const
})
