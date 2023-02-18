import { query } from 'server-utils/mysql'

export default defineEventHandler(async event => {
  const id = Number(event.context.params?.id ?? 0)
  const tab = await readBody<RQ.EditFollowLabelPost>(event)
  const items = [] as string[]
  const params = [] as any[]
  const allow_items = new Set<keyof typeof tab>([
    'label',
    'alias',
    'icon',
    'is_show',
  ])
  const format_bool = new Set<keyof typeof tab>(['is_show'])
  for (const _key in tab) {
    const key = _key as keyof typeof tab
    if (Object.prototype.hasOwnProperty.call(tab, key)) {
      const val = tab[key]
      if (!allow_items.has(key)) continue
      items.push(`${key}=?`)
      params.push(format_bool.has(key) ? (val ? 1 : 0) : val)
    }
  }
  if (!items.length)
    return {
      code: 11000,
      message: '至少传入一项可修改条目',
    } as const
  params.push(id)
  if (
    !(
      await query(
        `update follow_label_list set ${items.join()} where id=?`,
        params
      )
    ).changedRows
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
