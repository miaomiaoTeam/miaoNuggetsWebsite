<template>
  <div class="bg-[#f4f5f5] pt-[63px]">
    <!-- 标签栏 -->
    <nav class="fixed top-16 w-full h-10 bg-white" role="navigation">
      <div
        v-if="category_list"
        class="relative flex items-center max-w-[960px] h-full mx-auto text-sm"
      >
        <a
          class="pr-[1rem]"
          :class="{ active: category_choice === 'all' }"
          @click="category_choice = 'all'"
        >
          综合
        </a>
        <a
          class="px-[1rem]"
          :class="{ active: category_choice === 'follow' }"
          @click="category_choice = 'follow'"
        >
          关注
        </a>
        <a
          v-for="category of category_list.data"
          :key="category.id"
          class="px-[1rem]"
          :class="{ active: category_choice === category.id }"
          @click="category_choice = category.id"
        >
          {{ category.label }}
        </a>
        <a class="absolute right-0 pl-[1rem]">标签管理</a>
      </div>
    </nav>
    <div class="flex gap-5 max-w-[960px] mx-auto">
      <!-- 文章列表 -->
      <div class="flex-1">
        <postList />
      </div>
      <!-- 右侧栏 -->
      <div class="hidden homeLep:block">
        <postHomeAdBanner :w="240" />
        <postHomeAuthorRank />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: category_list } = useAsyncData(() =>
  $fetch('/api/label/category/list')
)
const category_choice = useState<DB.CategoryList['id'] | 'all' | 'follow'>(
  'CategoryChoice',
  () => 'all'
)
</script>

<style scoped>
a {
  @apply cursor-pointer;
}
a:hover,
a.active {
  @apply text-blue-500;
}
</style>
