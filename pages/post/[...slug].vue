<template>
  <div class="bg-[#f4f5f5] pt-[21px]">
    <!-- pc端 -->
    <div class="hidden postLep:block">
      <div class="flex max-w-[1140px] mx-auto postLep:gap-5">
        <!-- 悬浮panel -->
        <div class="postDes:mr-[-20px]">
          <postDetailSuspendPanel
            :digg-count="post_info?.data?.digg_count ?? 0"
            :comment-count="post_info?.data?.comment_count ?? 0"
          />
        </div>
        <!-- 文章详情 -->
        <div class="flex-1 postDes:ml-[90px]">
          <postDetailContent
            :create-time="post_info?.data?.create_time ?? new Date()"
            :view-count="post_info?.data?.view_count ?? 0"
            :nick-name="author_info?.data?.nickname ?? ''"
          >
            <template #header>
              <h1>{{ data.title }}</h1>
            </template>
            <template #default>
              <ContentRenderer :value="data">
                <ContentRendererMarkdown
                  ref="markdown"
                  :value="data"
                  class="prose max-w-none"
                  excerpt
                />
              </ContentRenderer> </template
          ></postDetailContent>
        </div>
        <!-- 右侧栏 -->
        <div>
          <PostDetailAuthorProfile
            :intro-duce="author_info?.data?.introduce ?? ''"
            :nick-name="author_info?.data?.nickname ?? ''"
            :be-liked="author_info?.data?.be_liked ?? 0"
            :be-viewed="author_info?.data?.be_viewed ?? 0"
          />
          <postHomeAdBanner :width="300" />
          <PostRelated />
          <postDetailCatalog />
        </div>
      </div>
    </div>
    <!-- mobile端 -->
    <div class="block postLep:hidden">
      <!-- panel -->
      <div class="w-full z-10 max-w-none">
        <postDetailSuspendPanel
          :digg-count="post_info?.data?.digg_count ?? 0"
          :comment-count="post_info?.data?.comment_count ?? 0"
        />
      </div>
      <!-- 文章详情 -->
      <div class="z-0">
        <postDetailContent
          :create-time="post_info?.data?.create_time ?? new Date()"
          :view-count="post_info?.data?.view_count ?? 0"
          :nick-name="author_info?.data?.nickname ?? ''"
        >
          <template #header>
            <h1>{{ data.title }}</h1>
          </template>
          <template #default>
            <ContentRenderer :value="data">
              <ContentRendererMarkdown
                ref="markdown"
                :value="data"
                class="prose max-w-none"
                excerpt
              />
            </ContentRenderer> </template
        ></postDetailContent>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { NodeItem } from '@/stores/api/catalog'
import type { NodeItems } from '@/stores/api/catalog'
import { useCatalogStore } from '@/stores/catalog'
import { usePostStore } from '@/stores/post/post_detail'
const catalog = useCatalogStore()
const route = useRoute()
const postStore = usePostStore()
const { post_id } = storeToRefs(postStore)
// 获取指定文章信息
const { data: post_info } = await useAsyncData('post_info', () =>
  $fetch('/api/article/info', {
    query: { id: post_id.value },
  })
)
// 获取指定文章作者信息
const { data: author_info } = await useAsyncData('author_info', () =>
  $fetch('/api/article/author', {
    query: { id: post_id.value },
  })
)
// 扁平化数组对象
function extractTree(arrs: NodeItems, childs: string) {
  const attrList: string[] = Object.keys(arrs[0]) // 存储数组对象的key
  if (attrList.includes(childs)) {
    // 如果第二参数是children
    attrList.splice(attrList.indexOf(childs), 1) // 那么就把attrList的children去掉，此时就变成attrList=["id","pid","name"]
  }
  const list: NodeItems = []
  const getObj = (arrs: NodeItems) => {
    arrs.forEach(row => {
      const obj = {} as NodeItem
      attrList.forEach((item: string) => {
        obj[item] = row[item] ? row[item] : ''
      })
      list.push(obj)
      if (row[childs]) {
        getObj(row[childs] as unknown as NodeItems) // 递归
      }
    })
    return list
  }
  return getObj(arrs)
}
const markdown = ref()
const tocs = ref<NodeItems>([])
const { data } = await useAsyncData<any>('page-data', () =>
  queryContent(`${Array.from(route.params.slug).join('/')}`).findOne()
)
onMounted(() => {
  tocs.value = [...markdown.value.value.body.toc.links]
  tocs.value = extractTree(tocs.value, 'children')
  catalog.update_doc_catalog(tocs.value)
  // console.log('tocs.value', tocs.value)
  // console.log('markdown.value', markdown.value)
})
// console.log('route.params.id', Array.from(route.params.slug).join('/'))
</script>
