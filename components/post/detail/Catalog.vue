<template>
  <div v-if="tocs.length > 0" class="toc">
    <div class="title">文章目录</div>
    <!-- 遍历目录 -->
    <div v-for="toc in tocs" :key="toc.href">
      <!-- <a @click="scrollToPosition(toc.href)" v-html="toc.name">{{ toc.name }}</a> -->
      <a @click.prevent="scrollToPosition(toc.href)">{{ toc.name }}</a>
      <!-- <a>{{ toc.name }}</a> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
// pinia数据
import { useCatalogStore } from '@/stores/catalog'
const catalog = useCatalogStore()
const { doc_catalog: tocs } = storeToRefs(catalog)

const scrollToPosition = (id: string) => {
  console.log('id', id)
}

// 实现跳转(暂时不完善)
// const scrollToPosition = (id: string) => {
//   const position = offsetDomTop(document.getElementById(id))
//   // 80是因为有着导航条的高度
//   position.top = position.top - 80
//   scrollToToc(position.top)
// }

// const offsetDomTop = (element: any) => {
//   // console.log(element)
//   const offset = {
//     top: 0,
//   }
//   let _position
//   getOffset(element, true)
//   return offset

//   function getOffset(node: any, init?: boolean) {
//     // 非element元素终止递归
//     if (node.nodeType === 1) {
//       // _position = window.getComputedStyle(node)['position']
//       _position = window.getComputedStyle(node).position
//       // position === static: 继续递归父节点
//       if (typeof init === 'undefined' && _position === 'static') {
//         getOffset(node.parentNode)
//         return
//       }
//       offset.top = node.offsetTop + offset.top - node.scrollTop

//       // _position === fixed: 获取值后退出递归
//       if (_position === 'fixed') {
//         return
//       }
//       getOffset(node.parentNode)
//     }
//   }
// }

// const scrollToToc = (positionTop: number) => {
//   // console.log(positionTop)
//   let curr_top =
//     document.documentElement.scrollTop ||
//     window.pageYOffset ||
//     document.body.scrollTop
//   const time_id = setInterval(() => {
//     curr_top += 10
//     // 网页被卷去的高
//     document.body.scrollTop = curr_top
//     // 获取或设置滚动条位置
//     document.documentElement.scrollTop = curr_top

//     if (curr_top >= positionTop) {
//       clearInterval(time_id)
//     }
//   }, 10)
// }
</script>
<style scoped></style>
