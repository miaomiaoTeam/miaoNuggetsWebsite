const white_list_api = {
  api: {
    auth: [
      { admin: ['signin', 'refresh'], user: ['signin', 'refresh'] },
      'token-valid',
      'logout',
    ],
    label: { tabs: ['list'], follow: ['list'], category: ['list'] },
    article: ['list', 'info', 'author', 'alike', 'recommend'],
  },
}

const admin_list_api = {
  api: {
    auth: { admin: ['info'], user: ['list', 'new', 'remove'] },
    label: {
      tabs: ['new', 'remove'],
      follow: ['new', 'remove'],
      category: ['new', 'remove'],
    },
    article: ['new', 'remove'],
  },
}

type RouteList = Record<string, any>

const readRoute = (
  routes: Record<string, MaybeArray<string | RouteList>>,
  prefix = ''
) => {
  const route_list = [] as string[]
  for (const [key, route] of Object.entries(routes)) {
    if (Array.isArray(route) || typeof route === 'string')
      route_list.push(...readApi(route, prefix + '/' + key))
    else route_list.push(...readRoute(route, prefix + '/' + key))
  }
  return route_list
}
const readApi = (apis: string | Array<string | RouteList>, prefix = '') => {
  if (!Array.isArray(apis)) apis = [apis]
  const api_list = [] as string[]
  for (const api of apis) {
    if (typeof api === 'string')
      api_list.push(prefix + (!api || api === 'index' ? '' : '/' + api))
    else api_list.push(...readRoute(api, prefix))
  }
  return api_list
}

export const white_list = new Set(readRoute(white_list_api))
export const admin_list = new Set(readRoute(admin_list_api))
