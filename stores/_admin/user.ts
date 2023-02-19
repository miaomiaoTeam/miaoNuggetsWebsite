import { refresh, increase, remove } from './utils'

export const useUserList = definePiniaStore('user_list', {
  state: () => ({
    list: [] as DB.UserList[],
    map: new Map<number, DB.UserList>(),
    raw: [] as DB.UserList[],
    update_time: undefined as DateString | undefined,
  }),
  getters: {
    options: state =>
      state.list.map(
        user =>
          ({
            label: user.nickname,
            value: user.id,
          } satisfies Client.Admin.selectOption)
      ),
    item: state => (id: number) => state.map.get(id),
  },
  actions: {
    async refresh() {
      const { data } = await $fetch('/api/auth/user/list')
      return refresh(this, data)
    },
    async new(form: Required<RQ.NewUserPut>) {
      const body = structuredClone<RQ.NewUserPut>(toRaw(form))
      if (!body.identity) delete body.identity
      if (!body.occupation) delete body.occupation
      if (!body.identity) delete body.identity
      const { data } = await $fetch('/api/auth/user/new', {
        method: 'put',
        body,
      })
      const user: DB.UserList = {
        ...data,
        ...form,
        role: 'none',
        level: 0,
        exp: 0,
        follow_label: {},
        follow_user: {},
        like_article: {},
        collect_article: {},
        be_viewed: 0,
        be_followed: 0,
        be_liked: 0,
        be_collected: 0,
        homepage: '',
        github: '',
      }
      increase(this, user)
    },
    async remove(id: MaybeArray<number>) {
      try {
        await ElMessageBox.confirm('确认删除指定条目吗？', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
        })
        await $fetch('/api/auth/user/remove', {
          method: 'delete',
          body: { id },
        })
        remove(this, id)
      } catch (err) {}
    },
  },
  persist: {
    key: 'ADMIN_USER_LIST',
    paths: ['raw', 'update_time'],
    storage: persistedState.sessionStorage,
    afterRestore({ store }) {
      console.log(`刚恢复了${store.$id}`)
      onMounted(() => {
        if (store.$state.update_time) {
          const [years, months, days, hours, minutes, seconds] = String(
            store.$state.update_time
          )
            .split(/[/:\s]/)
            .map(n => Number(n))
          const expired = new Date(
            years,
            months - 1,
            days,
            hours,
            minutes + 30,
            seconds
          )
          if (new Date() < expired) return refresh(store.$state as any)
        }
        $fetch('/api/auth/user/list').then(({ data }) => {
          refresh(store.$state as any, data)
        })
      })
    },
  },
})
