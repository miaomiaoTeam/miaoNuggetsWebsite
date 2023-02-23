<template>
  <div class="bg-[#f4f5f5]">
    <!-- 标签栏 -->
    <nav
      :class="{ _disappear: !isNavShow, _appear: isNavShow }"
      class="w-full h-[110px] fixed top-0 left-0 right-0 z-10 bg-white"
      role="navigation"
    >
      <div
        v-if="category_list"
        class="relative flex items-end max-w-[960px] h-full mx-auto text-sm bottom-3"
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
    <div class="flex gap-5 max-w-[960px] mx-auto pt-[120px]">
      <!-- 文章列表 -->
      <div class="flex-1">
        <postList />
      </div>
      <!-- 右侧栏 -->
      <div class="hidden homeLep:block">
        <postHomeAdBanner :width="240" />
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
const isNavShow = ref(true)
// 获取当前已从顶部滚动的距离
const getPageTop = () => {
  return window.pageYOffset
}
const throttledFn = useThrottleFn(() => {
  console.log('getPageTop', getPageTop())
  if (getPageTop() > 400) isNavShow.value = false
  else isNavShow.value = true
}, 200)
onMounted(() => {
  window.addEventListener('scroll', throttledFn)
})
onUnmounted(() => {
  window.removeEventListener('scroll', throttledFn)
})
</script>

<style scoped>
a {
  @apply cursor-pointer;
}
a:hover,
a.active {
  @apply text-blue-500;
}
._disappear {
  animation: disappear 0.3s;
  animation-fill-mode: forwards;
  animation-delay: 0;
  animation-timing-function: linear;
}
._appear {
  animation: appear 0.3s;
  animation-fill-mode: forwards;
  animation-delay: 0;
  animation-timing-function: linear;
}
@keyframes disappear {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-64px);
  }
}
@keyframes appear {
  from {
    transform: translateY(-64px);
  }
  to {
    transform: translateY(0px);
  }
}
</style>
