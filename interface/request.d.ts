namespace RQ {
  interface SignInPost {
    username: string
    password: string
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
}
