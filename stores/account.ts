export const useAccount = definePiniaStore('account', {
  state: (): {
    token?: Client.UserToken
    userinfo?: Client.UserInfo
  } => ({
    token: undefined,
    userinfo: undefined,
  }),
  getters: {
    access_token(): string | undefined {
      const { value, expired = 0 } = this.token?.access || {}
      if (Date.now() > expired) return
      return value
    },
    refresh_token(): string | undefined {
      const { value, expired = 0 } = this.token?.refresh || {}
      if (Date.now() > expired) return
      return value
    },
    has_login(): boolean {
      return !!(this.userinfo && this.access_token && this.refresh_token)
    },
  },
  actions: {
    async signin(body: RQ.SignInPost) {
      const result = await $fetch('/api/auth/admin/signin', {
        method: 'post',
        body,
      })
      if (result.code) {
        ElMessage.error(result.message)
        return
      }
      this.token = result.data
    },
    async getUserInfo(userinfo?: Client.UserInfo, justread = false) {
      if (justread) userinfo = this.userinfo!
      if (!userinfo) userinfo = (await $fetch('/api/auth/admin/info')).data
      if (!justread) this.userinfo = userinfo!
      return userinfo
    },
    async refreshToken(token?: Client.UserToken) {
      if (token) return (this.token = token)
      if (!this.token) return
      const headers = new Headers()
      headers.set('Authentication', this.refresh_token ?? '')
      const {
        data: { access, refresh },
      } = await $fetch('/api/auth/admin/refresh', {
        method: 'post',
        headers,
      })
      this.token.access = access
      if (refresh) this.token.refresh = refresh
      return this.token
    },
    async logout() {
      const headers = new Headers()
      headers.set('Authentication', this.refresh_token ?? '')
      await $fetch('/api/auth/admin/logout', {
        method: 'head',
        headers,
      })
      this.$reset()
    },
  },
})
