import { refresh, increase, remove } from './utils'

export const useCategoryList = definePiniaStore('category_list', {
  state: () => ({
    list: [] as DB.CategoryList[],
    map: new Map<number, DB.CategoryList>(),
    raw: [] as DB.CategoryList[],
    update_time: undefined as DateString | undefined,
  }),
  getters: {
    options: state =>
      state.list.map(
        category =>
          ({
            label: category.label,
            value: category.id,
          } satisfies Client.Admin.selectOption)
      ),
    item: state => (id: number) => state.map.get(id),
  },
  actions: {
    async refresh() {
      const { data } = await $fetch('/api/label/category/list')
      return refresh(this, data)
    },
    async new(form: Required<RQ.NewCategoryPut>) {
      const body = structuredClone<RQ.NewCategoryPut>(toRaw(form))
      if (body.is_show) delete body.is_show
      const { data } = await $fetch('/api/label/category/new', {
        method: 'put',
        body,
      })
      const category: DB.CategoryList = {
        ...data,
        ...form,
        article: 0,
      }
      increase(this, category)
    },
    async remove(id: MaybeArray<number>) {
      try {
        await ElMessageBox.confirm('确认删除指定条目吗？', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
        })
        await $fetch('/api/label/category/remove', {
          method: 'delete',
          body: { id },
        })
        remove(this, id)
      } catch (err) {}
    },
  },
  persist: {
    key: 'ADMIN_CATEGORY_LIST',
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
        $fetch('/api/label/category/list').then(({ data }) => {
          refresh(store.$state as any, data)
        })
      })
    },
  },
})
