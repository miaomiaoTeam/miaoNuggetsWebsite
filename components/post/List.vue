<template>
  <main class="w-full bg-white">
    <!-- 分类栏 -->
    <ul class="flex px-3 py-4">
      <li v-for="item in navList" :key="item">
        <a
          :class="{ active: navList_choice === item }"
          href="javascript:;"
          @click="() => clickHandler(item)"
          >{{ item }}</a
        >
      </li>
    </ul>
    <el-divider />
    <!-- 文章列表 -->
    <div
      v-for="{ article_id, article_info, author_user_info } in postList?.data"
      :key="article_id"
      class="px-5 pt-3 mb-[14px] hover:bg-[#fafafa]"
      @click="() => store.setPostId(article_id)"
    >
      <!-- 作者 -->
      <NuxtLink :to="article_info.content_path">
        <div class="flex items-center">
          <a href="" class="text-sm">{{ author_user_info.nickname }}</a>
          <div class="w-[1px] h-[14px] bg-[#e5e6eb] mx-2"></div>
          <a href="" class="text-sm text-[#909090]">
            {{
              `${
                new Date(author_user_info.create_time).getMonth() + 1
              }月${new Date(author_user_info.create_time).getDate()}日`
            }}
          </a>
        </div>
        <!-- 内容 -->
        <div>
          <span class="block text-lg font-bold leading-6 mt-[14px] mb-3">
            {{ article_info.title }}
          </span>
          <span class="block text-sm text-[#86909c] leading-[22px] mb-[14px]">
            {{ article_info.introduce }}
          </span>
          <!-- 点赞 -->
          <div class="flex">
            <a href="" class="flex items-center mr-8">
              <img src="/svg/viewed.svg" alt="" class="h-4" />
              <span class="__icon text-[#4e5969]">{{
                article_info.view_count
              }}</span></a
            >
            <a href="" class="flex items-center mr-8">
              <img src="/svg/page_zan.svg" alt="" class="h-4" />
              <span class="__icon text-[#4e5969]">{{
                article_info.digg_count
              }}</span></a
            >
            <a href="" class="flex items-center mr-8">
              <img src="/svg/page_comment.svg" alt="" class="h-4" />
              <span class="__icon text-[#4e5969]">{{
                article_info.comment_count
              }}</span></a
            >
          </div>
        </div>
      </NuxtLink>
    </div>
    <el-divider />
  </main>
</template>

<script setup lang="ts">
import { usePostStore } from '@/stores/post/post_detail'
const store = usePostStore()

const navList = ref<string[]>(['推荐', '最新', '热榜'])

const { data: postList } = await useAsyncData('post_list', () =>
  $fetch('/api/article/recommend', {
    query: { cursor: 0, limit: 20, sort: navList_choice.value },
  })
)
const navList_choice = ref<string>('推荐')
const refresh = () => refreshNuxtData('post_list')
const clickHandler = (item: string | undefined) => {
  navList_choice.value = item ?? ''
  refresh()
}
onMounted(() => {
  refresh()
})
// const refresh = () => refreshNuxtData('count')
// const { data: postList } = await $fetch('/api/article/recommend', {
//   query: { cursor: 0, limit: 20 },
// })
</script>
<style scoped>
.el-divider--horizontal {
  margin: 3px 0;
  background: 0 0;
  border-top: 1px solid #e8eaec;
}
li a {
  @apply w-[56px] text-sm text-[#909090] text-center block border-r-[1px];
}
li a:hover,
li a.active {
  @apply w-[56px] text-sm text-[#909090] text-center block border-r-[1px];
  @apply text-blue-500;
}
.icon {
  @apply text-sm font-medium  ml-2;
}
</style>
