<template>
  <div v-if="author_info" class="w-[300px] h-[300px]">
    <el-card shadow="never">
      <div class="flex pb-[17px]">
        <a href="">
          <img
            class="rounded-full w-12 h-12"
            src="https://p3-passport.byteimg.com/img/user-avatar/89db7db9a82487e9a26011b2624920f8~100x100.awebp"
            alt=""
        /></a>
        <div class="ml-4">
          <div class="text-base font-medium text-[#252933] mt-1">
            {{ author_info.data?.nickname }}
            <img
              src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/lv-6.b69935b.png"
              alt=""
              class="inline-block w-[35px] h-4"
            />
          </div>
          <div class="text-sm font-normal text-[#515767]">
            {{ author_info.data?.introduce }}
          </div>
        </div>
      </div>
      <div class="flex justify-between gap-4">
        <el-button type="primary" class="flex-1">关注</el-button>
        <el-button type="primary" class="flex-1" plain>私信</el-button>
      </div>
      <el-divider />
      <div class="flex">
        <img src="/svg/page_author_zan.svg" class="mr-3" />
        获得点赞&nbsp;{{ author_info.data?.be_liked }}
      </div>
      <div class="flex mt-2">
        <img src="/svg/page_author_viewed.svg" class="mr-3 w-[25px]" />
        文章被阅读数&nbsp;{{ author_info.data?.be_viewed }}
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/post/post_detail'
const postStore = usePostStore()
const { post_id } = storeToRefs(postStore)
// import { NodeItem } from '@/interface'
// interface postAuthorType {
//   id: number
//   username: string
//   be_viewed: number
//   be_liked: number
//   introduce: number
// }
// const author = ref<postAuthorType>()
// watchEffect(async () => {
//   const { data } = await useLazyFetch<any>(
//     'http://127.0.0.1:4523/m1/2295980-0-default/api/article/author'
//   )
//   author.value = data.value?.data
//   console.log('data', author)
// })
// const { data } = await useFetch<any>(
//   'http://127.0.0.1:4523/m1/2295980-0-default/api/article/author'
// )
// author.value = data.value?.data
const { data: author_info } = await useAsyncData('author_info', () =>
  $fetch('/api/article/author', {
    query: { id: post_id.value },
  })
)
</script>
<style scoped></style>
