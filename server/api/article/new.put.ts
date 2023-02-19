export default defineEventHandler(async event => {
  const {
    title,
    introduce = '',
    cover_image = '',
    author_id,
    category_id,
    tag_ids,
    content_path,
  } = await readBody<RQ.NewArticlePut>(event)
  const { insertId } = await query(
    'insert into article_list ' +
      '(title,introduce,cover_image,author_id,category_id,tag_ids,content_path) ' +
      'values (?,?,?,?,?,?,?)',
    [
      title,
      introduce,
      cover_image,
      author_id,
      category_id,
      JSON.stringify(tag_ids),
      content_path,
    ]
  )
  const timestamp = new Date()
  if (!insertId) throw new Error('数据库修改错误')
  return {
    code: 0,
    message: 'OK',
    data: {
      id: insertId,
      create_time: timestamp,
      update_time: timestamp,
    },
  } as const
})
