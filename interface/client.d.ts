namespace Client {
  interface Token {
    value: string
    expired: number
  }
  interface UserToken {
    access: Token
    refresh: Token
  }

  type UserInfo = Omit<DB.AdminList, 'password'>

  namespace Admin {
    interface tableColumn {
      label: string
      prop: string
      width?: string | number
      editor?: 'switch' | 'input'
    }
    interface DataEditorProps<Row extends DB.WriteAble = DB.WriteAble> {
      row: Row
      rowKey: keyof Row | string
      type: 'switch' | 'input'
    }
  }
}
