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
}
