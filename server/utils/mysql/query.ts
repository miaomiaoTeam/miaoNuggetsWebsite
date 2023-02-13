import type { OkPacket } from 'mysql'
import { pool } from './pool'
import { record, recordError } from './record'
import { getTilte } from './log'

export const query = <T extends Record<string, any> | unknown = unknown>(
  sql: string,
  values?: any[]
) =>
  new Promise<unknown extends T ? OkPacket : T[]>((resolve, reject) => {
    pool.use().then(conn => {
      const log = console.draft(getTilte().toString(), '启用了一条链接')
      conn.query(sql, values, (err, results) => {
        if (err) {
          log(getTilte().toString(), '查询错误', err.sqlMessage)
          recordError(err)
          return reject(err)
        }
        if (!Array.isArray(results)) {
          log(getTilte().toString(), results)
          record(
            `\n-\tSQL语句: ${sql}\n-\t插入值: ${
              values?.join(' | ') ?? '无'
            }\n-\t查询结果: `,
            results
          )
        } else if (results.length) {
          log(getTilte().toString(), `查询到${results.length}条数据`)
          record(
            `\n-\tSQL语句: ${sql}\n-\t插入值: ${
              values?.join(' | ') ?? '无'
            }\n-\t查询结果: `,
            results
          )
        } else {
          log(getTilte().toString(), '未找到数据')
          record(
            `\n-\tSQL语句: ${sql}\n-\t插入值: ${
              values?.join(' | ') ?? '无'
            }\n-\t查询结果: 未找到数据`
          )
        }
        resolve(results)
      })
      conn.release()
    })
  })
