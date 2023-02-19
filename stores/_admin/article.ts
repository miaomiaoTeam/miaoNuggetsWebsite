import { refresh, increase, remove } from './utils'

export const useArticleList = definePiniaStore('article_list', {
  state: () => ({
    list: [] as DB.ArticleList[],
    map: new Map<number, DB.ArticleList>(),
    raw: [] as DB.ArticleList[],
    update_time: undefined as DateString | undefined,
  }),
  getters: {},
  actions: {
    async refresh() {
      const { data } = await $fetch('/api/article/list')
      return refresh(this, data)
    },
    async new(form: Required<RQ.NewArticlePut>) {
      const body = structuredClone<RQ.NewArticlePut>(toRaw(form))
      if (!body.introduce) delete body.introduce
      if (!body.cover_image) delete body.cover_image
      const { data } = await $fetch('/api/article/new', {
        method: 'put',
        body,
      })
      const article: DB.ArticleList = {
        ...data,
        ...form,
        view_count: 0,
        collect_count: 0,
        digg_count: 0,
        comment_count: 0,
      }
      increase(this, article)
    },
    async remove(id: MaybeArray<number>) {
      try {
        await ElMessageBox.confirm('确认删除指定条目吗？', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
        })
        await $fetch('/api/article/remove', {
          method: 'delete',
          body: { id },
        })
        remove(this, id)
      } catch (err) {}
    },
  },
  persist: {
    key: 'ADMIN_ARTICLE_LIST',
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
        $fetch('/api/article/list').then(({ data }) => {
          refresh(store.$state as any, data)
        })
      })
    },
  },
})
