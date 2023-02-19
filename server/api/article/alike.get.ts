export default defineEventHandler(async event => {
  let { id } = getQuery(event)
  if (Array.isArray(id)) id = id[0]
  const [article] = await query<DB.ArticleList>(
    'select * from article_list where id=?',
    [Number(id)]
  )
  if (!article)
    return {
      code: 21000,
      message: '找不到指定文章',
    } as const
  const { category_id, tag_ids } = dataToJson.article(article)
  const articles = await query<DB.ArticleList>(
    `select * from article_list where category_id=? and (${new Array(
      tag_ids.length
    )
      .fill(`json_contains(tag_ids,json_array(?))`)
      .join(' or ')}) and id<>? limit 5`,
    [category_id, ...tag_ids, Number(id)]
  )
  return {
    code: 0,
    message: 'OK',
    data: dataToJson.articles(articles),
  } as const
})
