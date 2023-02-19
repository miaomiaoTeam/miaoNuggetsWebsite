<template>
  <div class="w-[300px] mb-[20px]">
    <el-card shadow="never">
      <template #header>
        <div>相关文章</div>
      </template>
      <div v-for="post in posts" :key="post.id" class="mb-[8px]">
        <a
          href=""
          class="text-[14px] font-normal text-[#252933] leading-[22px] hover:text-[#1e80ff]"
          >{{ post.title }}</a
        >
        <div
          class="text-[#8a919f] text-[14px] font-normal leading-[22px] mt-[4px]"
        >
          {{ post.collect_count }}点赞 · {{ post.comment_count }}评论
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// const posts = ref([
//   {
//     id: '1',
//     title: '字节跳动是如何落地微前端的',
//     praise: '356',
//     comment: '14',
//   },
//   {
//     id: '2',
//     title: '记笔记,赢大礼!笔记创作活动来啦!|青训营第四期',
//     praise: '49',
//     comment: '57',
//   },
//   {
//     id: '3',
//     title: '第五届青训营阅读打卡活动来啦,奖品规则全面升级,快来学习吧',
//     praise: '92',
//     comment: '48',
//   },
//   {
//     id: '4',
//     title: '字节跳动最爱考的前端面试题:CSS基础',
//     praise: '2032',
//     comment: '62',
//   },
//   {
//     id: '5',
//     title: '字节跳动最爱考的前端面试题:JavaScript基础',
//     praise: '3829',
//     comment: '432',
//   },
// ])
// const { data: posts } = await useLazyFetch(
//   'http://127.0.0.1:4523/m1/2295980-0-default/api/article/alike'
// )
// watch(
//   posts,
//   newPosts => {
//     console.log(newPosts)
//   },
//   { immediate: true }
// )
interface postType {
  id: number
  title: string
  collect_count: number
  comment_count: number
}
const posts = ref<postType[]>([])
watchEffect(async () => {
  const { data } = await useLazyFetch<any>(
    'http://127.0.0.1:4523/m1/2295980-0-default/api/article/alike'
  )
  // console.log('data', data)
  posts.value = data.value?.data
})
</script>

<style scoped></style>
