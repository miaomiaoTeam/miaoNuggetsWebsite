namespace Client {
  interface Token {
    value: string
    expired: number
  }
  interface UserToken {
    access: Token
    refresh: Token
  }

  type UserInfo = Omit<DB.AdminList, 'password'> | Omit<DB.UserList, 'password'>

  namespace Admin {
    interface tableColumn<Data extends DB.Base = Record<string, unknown>> {
      label: string
      prop: keyof Data
      width?: string | number
      filter?: {
        options?: { text: string; value: any }[]
        method?: (val: string, row: Data) => boolean
        multiple?: boolean
      }
      editor?: 'switch' | 'input' | 'select'
      select?: {
        options: () => selectOption[]
        multiple?: boolean
      }
    }
    interface selectOption {
      label?: string | number
      value: string | number | boolean | object
      disabled?: boolean
    }
  }
}
