import { query } from 'server-utils/mysql'

export default defineEventHandler(async event => {
  const id = Number(event.context.params?.id ?? 0)
  const tab = await readBody<RQ.EditArticlePost>(event)
  const items = [] as string[]
  const params = [] as any[]
  const allow_items = new Set<keyof typeof tab>([
    'title',
    'introduce',
    'cover_image',
    'author_id',
    'category_id',
    'tag_ids',
    'content_path',
  ])
  const format_json = new Set<getSet<typeof allow_items>>(['tag_ids'])
  for (const _key in tab) {
    const key = _key as keyof typeof tab
    if (Object.prototype.hasOwnProperty.call(tab, key)) {
      const val = tab[key]
      if (!allow_items.has(key)) continue
      items.push(`${key}=?`)
      params.push(format_json.has(key) ? JSON.stringify(val) : val)
    }
  }
  if (!items.length)
    return {
      code: 11000,
      message: '至少传入一项可修改条目',
    } as const
  params.push(id)
  if (
    !(await query(`update article_list set ${items.join()} where id=?`, params))
      .changedRows
  )
    throw new Error('数据库修改错误')
  return {
    code: 0,
    message: 'OK',
    data: {
      update_time: new Date(),
    },
  } as const
})
