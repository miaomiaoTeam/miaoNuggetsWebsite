<template>
  <main class="w-full bg-white">
    <!-- 分类栏 -->
    <ul class="flex px-3 py-4">
      <li v-for="item in sortItems" :key="item">
        <a
          href=""
          class="w-[56px] text-sm text-[#909090] text-center block border-r-[1px]"
          >{{ item }}</a
        >
      </li>
    </ul>
    <el-divider />
    <!-- 文章列表 -->
    <div
      v-for="post in postList.data"
      :key="post.title"
      class="px-5 pt-3 mb-[14px]"
    >
      <!-- 作者 -->
      <NuxtLink to="/post">
        <div class="flex items-center">
          <a href="" class="text-sm">{{ post.author_user_info.nickname }}</a>
          <div class="w-[1px] h-[14px] bg-[#e5e6eb] mx-2"></div>
          <a href="" class="text-sm text-[#909090]">{{
            post.author_user_info.create_time
          }}</a>
        </div>
        <!-- 内容 -->
        <div>
          <span class="block text-lg font-bold leading-6 mt-[14px] mb-3">
            {{ post.article_info.title }}
          </span>
          <span class="block text-sm text-[#86909c] leading-[22px] mb-[14px]">
            {{ post.article_info.introduce }}
          </span>
          <!-- 点赞 -->
          <div class="flex">
            <div v-for="item in panelList" :key="item.src">
              <a href="" class="flex items-center mr-8">
                <img :src="item.src ?? ''" alt="" class="h-4" />
                <span class="text-sm font-medium text-[#8a93a0]">{{
                  item.data
                }}</span></a
              >
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
    <el-divider />
  </main>
</template>

<script setup lang="ts">
interface panelListOption {
  type: 'badge' | 'divider' | 'text'
  src: string
  data?: number | string
}
const sortItems = ref(['推荐', '最新', '热榜'])
const panelList = ref<panelListOption[]>([
  { src: '/svg/page_zan.svg', type: 'badge', data: 10 },
  { src: '/svg/page_comment.svg', type: 'badge', data: 178 },
  { src: '/svg/page_collect.svg', type: 'text', data: '收藏' },
])
const { data: postList } = await useFetch(
  'http://127.0.0.1:4523/m1/2295980-0-default/api/article/recommend'
)
</script>
<style scoped>
.el-divider--horizontal {
  margin: 3px 0;
  background: 0 0;
  border-top: 1px solid #e8eaec;
}
</style>
