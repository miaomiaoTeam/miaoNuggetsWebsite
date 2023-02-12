import { query } from 'server-utils/mysql'

export default defineEventHandler(async event => {
  const id = Number(event.context.params.id)
  const tab = await readBody<RQ.EditTabsLabelPost>(event)
  const items = [] as string[]
  const params = [] as any[]
  const allow_items = new Set([
    'label',
    'route',
    'link',
    'badge',
    'is_show',
    'in_menu',
  ])
  const format_bool = new Set(['is_show', 'in_menu'])
  // eslint-disable-next-line prefer-const
  for (let [key, val] of Object.entries(tab)) {
    if (!allow_items.has(key)) continue
    if (format_bool.has(key)) val = val ? 1 : 0
    items.push(`${key}=?`)
    params.push(val)
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
        `update tabs_label_list set ${items.join()} where id=?`,
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

declare module 'h3' {
  interface H3EventContext {
    params: {
      id: string
    }
  }
}
