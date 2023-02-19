import { refresh, increase, remove } from './utils'

export const useTagList = definePiniaStore('tag_list', {
  state: () => ({
    list: [] as DB.FollowLabelList[],
    map: new Map<number, DB.FollowLabelList>(),
    raw: [] as DB.FollowLabelList[],
    update_time: undefined as DateString | undefined,
  }),
  getters: {
    options: state =>
      state.list.map(
        tag =>
          ({
            label: tag.label,
            value: tag.id,
          } satisfies Client.Admin.selectOption)
      ),
    item: state => (id: number) => state.map.get(id),
  },
  actions: {
    async refresh() {
      const { data } = await $fetch('/api/label/follow/list')
      return refresh(this, data)
    },
    async new(form: Required<RQ.NewFollowLabelPut>) {
      const body = structuredClone<RQ.NewFollowLabelPut>(toRaw(form))
      if (body.is_show) delete body.is_show
      const { data } = await $fetch('/api/label/follow/new', {
        method: 'put',
        body,
      })
      const tag: DB.FollowLabelList = {
        ...data,
        ...form,
        follow: 0,
        article: 0,
      }
      increase(this, tag)
    },
    async remove(id: MaybeArray<number>) {
      try {
        await ElMessageBox.confirm('确认删除指定条目吗？', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
        })
        await $fetch('/api/label/follow/remove', {
          method: 'delete',
          body: { id },
        })
        remove(this, id)
      } catch (err) {}
    },
  },
  persist: {
    key: 'ADMIN_TAG_LIST',
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
        $fetch('/api/label/follow/list').then(({ data }) => {
          refresh(store.$state as any, data)
        })
      })
    },
  },
})
