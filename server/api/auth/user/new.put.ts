import { query } from 'server-utils/mysql'

export default defineEventHandler(async event => {
  const {
    nickname,
    introduce = null,
    occupation = null,
    identity = null,
  } = await readBody<RQ.NewUserPut>(event)
  const username = '' + Date.now()
  const password = '123456'
  const { insertId } = await query(
    'insert into user_list ' +
      '(username,nickname,role,password,introduce,occupation,identity,' +
      'follow_label,follow_user,like_article,collect_article) ' +
      'values (?,?,"none",?,?,?,?,"{}","{}","{}","{}")',
    [username, nickname, password, introduce, occupation, identity]
  )
  const timestamp = new Date()
  if (!insertId) throw new Error('数据库修改错误')
  return {
    code: 0,
    message: 'OK',
    data: {
      id: insertId,
      username,
      password,
      create_time: timestamp,
      update_time: timestamp,
    },
  } as const
})
