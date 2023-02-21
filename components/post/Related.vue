<template>
  <div class="w-[300px] mb-[20px]">
    <el-card shadow="never">
      <template #header>
        <div>相关文章</div>
      </template>
      <div v-for="post in post_List?.data" :key="post.id" class="mb-[8px]">
        <NuxtLink
          :to="post.content_path"
          class="text-[14px] font-normal text-[#252933] leading-[22px] hover:text-[#1e80ff]"
          >{{ post.title }}</NuxtLink
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
import { storeToRefs } from 'pinia'
import { usePostStore } from '@/stores/post/post_detail'
const postStore = usePostStore()
const { post_id } = storeToRefs(postStore)

const { data: post_List } = await useAsyncData('post_list', () =>
  $fetch('/api/article/alike', {
    query: { id: post_id.value },
  })
)
</script>

<style scoped></style>
