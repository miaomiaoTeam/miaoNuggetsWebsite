namespace DB {
  /** 数据表基础类型 */
  interface Base {
    /** 序号 */
    readonly id: number
    /** 创建时间 */
    readonly create_time: Date
  }
  /** 可修改的数据表基础类型 */
  interface WriteAble extends Base {
    /** 修订时间 */
    update_time: Date
  }

  type RecordTime<Keys extends string = string> = {
    [Key in Keys]: Date
  }

  /** 管理员账号列表 */
  interface AdminList extends WriteAble {
    username: string
    nickname?: string
    role: 'admin'
    password: string
  }

  /** 用户账号列表 */
  interface UserList extends WriteAble {
    username: string
    nickname: string
    role: 'none' | 'author'
    password: string
    level: number
    exp: number
    follow_label: RecordTime<`id:${number}`>
    be_viewed: number
    follow_user: RecordTime<`id:${number}`>
    be_followed: number
    like_article: RecordTime<`id:${number}`>
    be_liked: number
    collect_article: RecordTime<`id:${number}`>
    be_collected: number
    occupation: string
    identity: string
    introduce: string
    homepage: string
    github: string
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

  /** 可关注标签列表 */
  interface FollowLabelList extends WriteAble {
    label: string
    alias: string
    icon: string
    follow: number
    article: number
    is_show: boolean
  }

  interface CategoryList extends WriteAble {
    /** 标签名 */
    label: string
    /** 别名，用于检索 */
    alias: string
    /** 图标 */
    icon: string
    /** 文章数 */
    article: number
    /** 列表显示，是否在可选列表显示 */
    is_show: boolean
  }

  /** 文章列表 */
  interface ArticleList extends WriteAble {
    /** 标题 */
    title: string
    /** 介绍 */
    introduce: string
    /** 贴图，文章列表右侧 */
    cover_image: string
    /** 作者id */
    author_id: number
    /** 类型id */
    category_id: number
    /** 标签id列表 */
    tag_ids: number[]
    /** 文章路径 */
    content_path: string
    /** 被展示次数 */
    view_count: number
    /** 被收藏次数 */
    collect_count: number
    /** 被点赞次数 */
    digg_count: number
    /** 评论数 */
    comment_count: number
  }
}
