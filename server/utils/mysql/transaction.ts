import type { OkPacket, PoolConnection } from 'mysql'
import { pool } from './pool'
import { formatObject, record } from './record'
import { getTilte } from './log'

enum TransactionStatus {
  PENDDING,
  COMMITED,
  ROLLBACKED,
}

export class Transaction {
  conn?: PoolConnection
  record = [] as string[]
  log = console.draft(getTilte().toString(), '一项事务管理已就位')
  status = TransactionStatus.PENDDING

  begin() {
    return new Promise<void>((resolve, reject) => {
      this.log(getTilte().toString(), '正在启动事务')
      pool.use().then(
        conn => {
          this.conn = conn
          this.conn.beginTransaction(err => {
            if (err) {
              this.rollback('事务启动失败')
              reject(err)
            } else {
              this.record.push('------- 事务启动 -------')
              resolve()
            }
          })
        },
        err => {
          this.log(getTilte().toString(), '连接分发错误', err)
          reject(err)
        }
      )
    })
  }

  commit() {
    return new Promise<void>((resolve, reject) => {
      if (this.status !== TransactionStatus.PENDDING)
        return reject(new Error('事务状态已被改变'))
      if (!this.conn) return reject(new Error('找不到连接'))
      this.conn.commit(err => {
        if (err) {
          this.rollback('事务提交失败')
          reject(err)
        } else {
          this.status = TransactionStatus.COMMITED
          this.record.push('------- 事务提交成功 -------')
          this.log(getTilte().toString(), '事务提交成功')
          this.release()
          resolve()
        }
      })
    })
  }

  rollback(reason = '未知') {
    return new Promise<void>((resolve, reject) => {
      if (this.status !== TransactionStatus.PENDDING)
        return reject(new Error('事务状态已被改变'))
      if (!this.conn) return reject(new Error('找不到连接'))
      this.conn.rollback(err => {
        this.record.push(`------- 事务已回滚：${reason} -------`)
        this.log(getTilte().toString(), '事务已回滚', reason)
        this.release()
        if (err) reject(err)
        else {
          this.status = TransactionStatus.ROLLBACKED
          resolve()
        }
      })
    })
  }

  release() {
    if (this.conn) {
      this.conn.release()
      record(this.record.join('\r\r'))
      this.conn = undefined
    }
    this.status = TransactionStatus.PENDDING
  }

  query(sql: string, values?: any[]): Promise<OkPacket>
  query<T extends Record<string, any>>(
    sql: string,
    values?: any[]
  ): Promise<T[]>

  query(sql: string, values?: any[]) {
    return new Promise<any>((resolve, reject) => {
      if (this.status !== TransactionStatus.PENDDING)
        return reject(new Error('事务状态已被改变'))
      if (!this.conn) return reject(new Error('找不到连接'))
      this.conn.query({ sql, values }, async (err, results) => {
        if (err) {
          this.record.push(
            Object.entries(err)
              .map(([key, val]) => `\n-\t${key}: ${val}`)
              .join('')
          )
          await this.rollback('查询出现破坏性错误 ' + err.sqlMessage)
          return reject(err)
        }
        pool.refresh()
        if (!Array.isArray(results) || results.length)
          this.record.push(
            `\n-\tSQL语句: ${sql}\n-\t插入值: ${
              values?.join(' | ') ?? '无'
            }\n-\t查询结果: \n${formatObject(results)}`,
            results
          )
        else
          this.record.push(
            `\n-\tSQL语句: ${sql}\n-\t插入值: ${
              values?.join(' | ') ?? '无'
            }\n-\t查询结果: 未找到数据`
          )
        resolve(results)
      })
    })
  }
}

export const useTransaction = () => new Transaction()
