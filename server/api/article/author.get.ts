export default defineEventHandler(async event => {
  let { id } = getQuery(event)
  if (Array.isArray(id)) id = id[0]
  const [article] = await query<DB.ArticleList>(
    'select * from article_list where id=? limit 1',
    [id]
  )
  if (!article)
    return {
      code: 21000,
      message: '找不到指定文章',
    } as const
  const [user] = await query<DB.UserList>(
    'select * from user_list where id=? limit 1',
    [article.author_id]
  )
  if (!user)
    return {
      code: 21000,
      message: '找不到指定文章的作者信息',
    } as const
  return {
    code: 0,
    message: 'OK',
    data: dataToJson.user(user),
  } as const
})
