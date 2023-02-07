<template>
  <div v-if="tocs.length > 0" class="sticky top-[80px] w-[300px] bg-[white]">
    <div class="mx-5 pt-4">目录</div>
    <el-divider />
    <!-- 遍历目录 -->
    <div class="pb-3">
      <div
        v-for="toc in tocs"
        :key="toc.href"
        :class="toc.href === activeToc ? 'text-[#007fff] p-2' : 'p-2'"
        @click="hightLightHandler(toc.href)"
      >
        <a
          :style="{ marginLeft: marginLeftOffset(toc.tag) }"
          :href="scrollToPosition(toc.href)"
          >{{ toc.name }}</a
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCatalogStore } from '@/stores/catalog'
const catalog = useCatalogStore()
const { doc_catalog: tocs } = storeToRefs(catalog)

const activeToc = ref('')
// 实现目录缩进
const marginLeftOffset = (size: string) => {
  return +size * 10 + 'px'
}
// 实现目录跳转
const scrollToPosition = (id: string) => {
  return `#${id}`
}
// 实现目录高亮
const hightLightHandler = (id: string) => {
  activeToc.value = id
}
// 获取页面中所有h标签距离顶部的位置
const getHtagHeight = () => {
  const tag: HTMLElement[] = Array.from(document.querySelectorAll('.site'))
  const hTagHeight = []
  for (let i = 0; i < tag.length; i++) {
    hTagHeight.push(tag[i].offsetTop) // offsetLeft/offsetTop 提供相对于 offsetParent 左上角的 x/y 坐标
  }
  return hTagHeight
}
// 获取当前已从顶部滚动的距离
const getPageTop = () => {
  return window.pageYOffset
}
const scrollHandler = async () => {
  await nextTick()
  const _scrollTop = getPageTop()
  const arr = getHtagHeight()
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < _scrollTop && arr[i + 1] > _scrollTop) {
      return (activeToc.value = tocs.value[i]?.href) // 当前页面在位于第i个h标签和第i+1之间时,显示第i个标签对应的目录内容
    }
  }
}
// 对scroll事件进行监听
onMounted(() => {
  window.addEventListener('scroll', throttle(scrollHandler, 100))
})
onUnmounted(() => {
  window.removeEventListener('scroll', throttle(scrollHandler, 100))
})
// 节流:n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
function throttle(fn: (...arg: any[]) => any, interval = 300) {
  let lock = false
  return function (this: unknown, ...args: any[]) {
    if (lock) return
    lock = true
    setTimeout(() => (lock = false), interval)
    fn.bind(this)(...args)
  }
}
</script>
<style scoped></style>
