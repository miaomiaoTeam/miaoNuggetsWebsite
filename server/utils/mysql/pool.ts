import type { Pool, PoolConnection } from 'mysql'
import { createPool } from 'mysql'
import MySQLConfig from '../../config/mysql'
import { useDBG } from './log'

const dbg = useDBG(true)

export class PoolManager {
  config
  constructor(config: Parameters<typeof createPool>[0]) {
    this.config = config
  }

  pool?: Pool
  private _create() {
    if (!this.pool) {
      dbg.log('创建连接池')
      this.pool = createPool(this.config)
      this._start()
    }
    return this.pool
  }

  private _destory() {
    // _clearTimer()
    if (this.pool)
      this.pool.end(() => {
        dbg.log('连接池已关闭')
        this.pool = undefined
      })
  }

  timer?: NodeJS.Timeout
  private _start() {
    if (!this.timer)
      this.timer = setTimeout(() => {
        this._destory()
      }, 10 * 60 * 1000)
    return this.timer
  }

  private _clear() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = undefined
    }
  }

  use() {
    return new Promise<PoolConnection>((resolve, reject) => {
      const pool = this._create()
      pool.getConnection((err, connection) => {
        if (err) {
          dbg.error('连接分发错误', err)
          return reject(err)
        }
        dbg.log('已分发一条连接')
        this.refresh()
        resolve(connection)
      })
    })
  }

  refresh() {
    this._clear()
    if (!this.pool) return
    return this._start()
  }

  static MAX_FREE_TIME = 10 * 60 * 1000
}

export const pool = new PoolManager(MySQLConfig)
