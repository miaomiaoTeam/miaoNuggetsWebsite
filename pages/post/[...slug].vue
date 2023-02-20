<template>
  <div class="bg-[#f4f5f5] pt-[21px]">
    <!-- pc端 -->
    <div class="hidden postLep:block">
      <div class="flex max-w-[1140px] mx-auto postLep:gap-5">
        <!-- 悬浮panel -->
        <div class="postDes:mr-[-20px]">
          <postDetailSuspendPanel />
        </div>
        <!-- 文章详情 -->
        <div class="flex-1 postDes:ml-[90px]">
          <postDetailContent>
            <!-- <ContentRenderer :value="data">
              <ContentRendererMarkdown
                ref="markdown"
                :value="data"
                class="prose"
                excerpt
              />
            </ContentRenderer> -->
          </postDetailContent>
        </div>
        <!-- 右侧栏 -->
        <div>
          <PostDetailAuthorProfile />
          <postHomeAdBanner :w="300" />
          <PostRelated />
          <postDetailCatalog />
        </div>
      </div>
    </div>
    <!-- mobile端 -->
    <div class="block postLep:hidden">
      <!-- panel -->
      <div class="w-full z-10">
        <postDetailSuspendPanel />
      </div>
      <!-- 文章详情 -->
      <div class="z-0">
        <postDetailContent></postDetailContent>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
// import { NodeItem } from '@/stores/api/catalog'
// import type { NodeItems } from '@/stores/api/catalog'
// import { useCatalogStore } from '@/stores/catalog'
// // 扁平化数组对象
// function extractTree(arrs: NodeItems, childs: string) {
//   const attrList: string[] = Object.keys(arrs[0]) // 存储数组对象的key
//   if (attrList.includes(childs)) {
//     // 如果第二参数是children
//     attrList.splice(attrList.indexOf(childs), 1) // 那么就把attrList的children去掉，此时就变成attrList=["id","pid","name"]
//   }
//   const list: NodeItems = []
//   const getObj = (arrs: NodeItems) => {
//     arrs.forEach(row => {
//       const obj = {} as NodeItem
//       attrList.forEach((item: string) => {
//         obj[item] = row[item] ? row[item] : ''
//       })
//       list.push(obj)
//       if (row[childs]) {
//         getObj(row[childs] as unknown as NodeItems) // 递归
//       }
//     })
//     return list
//   }
//   return getObj(arrs)
// }
// const catalog = useCatalogStore()
// const route = useRoute()
// const markdown = ref()
// const tocs = ref<NodeItems>([])
// const { data } = await useAsyncData<any>('page-data', () =>
//   queryContent('/docs/standards/git').findOne()
// )
// onMounted(() => {
//   tocs.value = [...markdown.value.value.body.toc.links]
//   tocs.value = extractTree(tocs.value, 'children')
//   catalog.update_doc_catalog(tocs.value)
//   // console.log('tocs.value', tocs.value)
//   // console.log('markdown.value', markdown.value)
// })
// console.log('route.params.id', route.params.slug)
</script>
