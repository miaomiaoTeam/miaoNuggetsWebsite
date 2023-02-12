namespace DB {
  /** 数据表基础类型 */
  interface Base {
    readonly id: number
    readonly create_time: Date
  }
  /** 可修改的数据表基础类型 */
  interface WriteAble extends Base {
    update_time: Date
  }

  /** 管理员账号列表 */
  interface AdminList extends WriteAble {
    username: string
    nickname?: string
    role: 'admin'
    password: string
  }

  /** 顶部选项卡列表 */
  interface TabsLabelList extends WriteAble {
    label: string
    route: string
    link: string
    badge: string
    is_show: boolean
    in_menu: boolean
  }
}
