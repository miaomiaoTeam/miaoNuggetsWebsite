namespace RQ {
  interface SignInPost {
    username: string
    password: string
  }

  type EditUserPost = PickRecord<
    DB.UserList,
    | 'password'
    | 'nickname'
    | 'role'
    | 'occupation'
    | 'identity'
    | 'introduce'
    | 'homepage'
    | 'github'
  >
  type NewUserPut = PickRecord<
    DB.UserList,
    'introduce' | 'occupation' | 'identity',
    'nickname'
  >
  interface RemoveUserDelete {
    id: MaybeArray<number>
  }

  interface EditTabsLabelPost {
    label?: string
    route?: string
    link?: string
    badge?: string
    is_show?: boolean
    in_menu?: boolean
  }
  interface NewTabsLabelPut {
    label: string
    route: string
    link?: string
    badge?: string
    is_show?: boolean
    in_menu?: boolean
  }
  interface RemoveTabLabelDelete {
    id: MaybeArray<number>
  }

  type EditFollowLabelPost = PickRecord<
    DB.FollowLabelList,
    'label' | 'alias' | 'icon' | 'is_show'
  >
  type NewFollowLabelPut = PickRecord<
    DB.FollowLabelList,
    'is_show',
    'label' | 'alias' | 'icon'
  >
  interface RemoveFollowLabelDelete {
    id: MaybeArray<number>
  }

  type EditCategoryPost = PickRecord<
    DB.CategoryList,
    'label' | 'alias' | 'icon' | 'is_show'
  >
  type NewCategoryPut = PickRecord<
    DB.CategoryList,
    'is_show',
    'label' | 'alias' | 'icon'
  >
  interface RemoveCategoryDelete {
    id: MaybeArray<number>
  }

  interface ArticleListGet {
    cursor: number
    limit: number
    category: 'all' | 'follow' | number
    sort: string
  }
  type EditArticlePost = PickRecord<
    DB.ArticleList,
    | 'introduce'
    | 'cover_image'
    | 'title'
    | 'author_id'
    | 'category_id'
    | 'tag_ids'
    | 'content_path'
  >
  type NewArticlePut = PickRecord<
    DB.ArticleList,
    'introduce' | 'cover_image',
    'title' | 'author_id' | 'category_id' | 'tag_ids' | 'content_path'
  >
  interface RemoveArticleDelete {
    id: MaybeArray<number>
  }

  interface ADListGet {
    cursor: number
    limit: number
  }
  type EditADPost = PickRecord<DB.ADList, 'cover_image' | 'link' | 'is_show'>
  type NewADPut = PickRecord<DB.ADList, 'is_show', 'cover_image' | 'link'>
  interface RemoveADDelete {
    id: MaybeArray<number>
  }
}
