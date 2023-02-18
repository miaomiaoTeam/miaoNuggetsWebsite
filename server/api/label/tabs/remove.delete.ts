export default defineEventHandler(async event => {
  const { id } = await readBody<RQ.RemoveTabLabelDelete>(event)
  const ids = new Set(Array.isArray(id) ? id : [id])
  if (
    !(
      await query(
        `delete from tabs_label_list where id in (${new Array(ids.size)
          .fill('?')
          .join()})`,
        [...ids]
      )
    ).affectedRows
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
