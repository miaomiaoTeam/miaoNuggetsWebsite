import { query } from 'server-utils/mysql'
import { dataToJson } from 'server-utils/format'

export default defineEventHandler(async () => {
  const articles = await query<DB.ArticleList>('select * from article_list')
  return {
    code: 0,
    message: 'OK',
    data: dataToJson.articles(articles),
  } as const
})
