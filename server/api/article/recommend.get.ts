interface UserInteract {
  is_like: boolean
  is_follow: boolean
  is_collect: boolean
}

interface ArticleList {
  article_id: DB.ArticleList['id']
  article_info: DB.ArticleList
  author_user_info: Omit<
    DB.UserList,
    | 'follow_label'
    | 'follow_user'
    | 'like_article'
    | 'collect_article'
    | 'password'
  > & {
    follow_label: number
    follow_user: number
    like_article: number
    collect_article: number
  }
  category: DB.CategoryList
  tags: DB.FollowLabelList[]
  user_interact: UserInteract
}

export default defineEventHandler(async event => {
  const { $userinfo } = event.context
  const {
    cursor,
    limit,
    category = 'all',
  } = getQuery(event) as unknown as RQ.ArticleListGet
  const category_sql = (category => {
    if (category === 'all') return { sql: '', params: [] }
    if (category === 'follow') {
      if (!$userinfo) return { sql: '', params: [] }
      const follow_label = Object.keys($userinfo.follow_label)
      return {
        sql: ` where category_id in (${new Array(follow_label.length)
          .fill('?')
          .join()})`,
        params: follow_label,
      }
    }
    return {
      sql: ` where category_id=?`,
      params: [`id:${category}`],
    }
  })(category)
  const article_list = await query<DB.ArticleList>(
    `select * from article_list${category_sql.sql} limit ? offset ?`,
    [1 * limit, ...category_sql.params, cursor * limit]
  )
  const data = [] as ArticleList[]
  for (let article_info of article_list) {
    try {
      const {
        id: article_id,
        author_id,
        category_id,
        tag_ids,
      } = (article_info = dataToJson.article(article_info))
      const [author_info] = await query<DB.UserList>(
        'select * from user_list where id=? limit 1',
        [author_id]
      )
      if (!article_info) continue
      const [category] = dataToJson.categorys(
        await query<DB.CategoryList>(
          'select * from category_list where id=? limit 1',
          [category_id]
        )
      )
      if (!category) continue
      const tags = tag_ids.length
        ? dataToJson.tags(
            await query<DB.FollowLabelList>(
              `select * from follow_label_list where id in (${new Array(
                tag_ids.length
              )
                .fill('?')
                .join()})`,
              tag_ids
            )
          )
        : []
      const {
        follow_label,
        follow_user,
        like_article,
        collect_article,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        password,
        ...others
      } = author_info
      const author_user_info = {
        ...others,
        follow_label: recordTimeCount(follow_label),
        follow_user: recordTimeCount(follow_user),
        like_article: recordTimeCount(like_article),
        collect_article: recordTimeCount(collect_article),
      }
      const user_interact: UserInteract = {
        is_like: false,
        is_follow: false,
        is_collect: false,
      }
      if ($userinfo) {
        const { like_article, collect_article, follow_user } = $userinfo
        if (`id:${article_id}` in like_article) user_interact.is_like = true
        if (`id:${article_id}` in collect_article)
          user_interact.is_collect = true
        if (`id:${author_info.id}` in follow_user)
          user_interact.is_follow = true
      }
      data.push({
        article_id,
        article_info,
        author_user_info,
        category,
        tags,
        user_interact,
      })
    } catch (error) {
      continue
    }
  }
  return {
    code: 0,
    message: 'OK',
    data,
  } as const
})
