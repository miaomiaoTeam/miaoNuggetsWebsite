import { useAccount } from 'stores/account'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) return
  const account = useAccount()
  const has_login = await account.getLoginStatus()
  console.log(to.path, has_login)
  switch (to.path) {
    case '/_admin':
      if (has_login)
        return from.path === '/_admin'
          ? navigateTo('/_admin/account/admin')
          : abortNavigation()
      break
    default:
      if (!has_login) return navigateTo('/_admin')
      break
  }
})
