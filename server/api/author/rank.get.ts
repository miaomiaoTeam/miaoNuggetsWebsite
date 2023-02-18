interface AuthorList {
  author_id: DB.UserList['id']
  author_info: Omit<
    DB.UserList,
    | 'role'
    | 'follow_label'
    | 'follow_user'
    | 'like_article'
    | 'collect_article'
    | 'password'
  > & {
    role: 'author'
    follow_label: number
    follow_user: number
    like_article: number
    collect_article: number
  }
  is_follow: boolean
}

export default defineEventHandler(async event => {
  const { $userinfo } = event.context
  const { cursor, limit } = getQuery(event) as unknown as RQ.ArticleListGet
  const rank = dataToJson.users(
    await query<DB.UserList>(
      'select * from user_list where role="author" order by be_viewed desc limit ? offset ?',
      [1 * limit, cursor * limit]
    )
  )
  const data = rank.map<AuthorList>(author => {
    const {
      follow_label,
      follow_user,
      like_article,
      collect_article,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      password,
      ...others
    } = author
    const author_id = author.id
    const author_info = {
      ...others,
      follow_label: recordTimeCount(follow_label),
      follow_user: recordTimeCount(follow_user),
      like_article: recordTimeCount(like_article),
      collect_article: recordTimeCount(collect_article),
      role: 'author' as const,
    }
    const is_follow = $userinfo
      ? `id:${author_id}` in $userinfo.follow_user
      : false
    return { author_id, author_info, is_follow }
  })
  return {
    code: 0,
    message: 'OK',
    data,
  } as const
})
