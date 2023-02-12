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
      if (Date.now() / 1000 > expired) return
      return value
    },
    refresh_token(): string | undefined {
      const { value, expired = 0 } = this.token?.refresh || {}
      if (Date.now() / 1000 > expired) return
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
        return Promise.reject(result)
      }
      this.token = result.data
      this.getUserInfo()
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
        method: 'post',
        headers,
      })
      this.$reset()
      await navigateTo('/_admin')
    },
    async getLoginStatus() {
      try {
        if (this.has_login) return true
        if (this.access_token) {
          const userinfo = await this.getUserInfo()
          console.log(userinfo)
          return !!userinfo
        }
        if (this.refresh_token) {
          const token = await this.refreshToken()
          console.log(token)
          return !!token
        }
      } catch (err) {
        console.error(err)
      }
      return false
    },
  },
  persist: [
    {
      key: 'USER_TOKEN',
      paths: ['token'],
      storage: persistedState.localStorage,
    },
    {
      key: 'USER_INFO',
      paths: ['userinfo'],
      storage: persistedState.localStorage,
    },
  ],
})
