namespace DB {
  /** 数据表基础类型 */
  interface Base {
    readonly id: number
    readonly create_time: DateString
  }
  /** 可修改的数据表基础类型 */
  interface WriteAble extends Base {
    update_time: DateString
  }

  /** 管理员账号列表 */
  interface AdminList extends WriteAble {
    username: string
    nickname?: string
    role: 'admin'
    password: string
  }
}
