<template>
  <div class="w-full">
    <client-only>
      <mavon-editor
        ref="markdown"
        v-model="handbook"
        default-open="preview"
        :toolbars-flag="false"
        :editable="false"
        :subfield="false"
        box-shadow-style="0 0 #0000"
        preview-background="#ffffff"
    /></client-only>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import preview from '@/content/docs/standards/git.md?raw'
// pinia数据
import { useCatalogStore } from '@/stores/catalog'
// 导入类型
import { NodeItem } from '@/stores/api/catalog'
import type { NodeItems } from '@/stores/api/catalog'

const handbook = ref(preview)

const markdown = ref()
const tocs = ref<NodeItems>([])
const catalog = useCatalogStore()

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

onMounted(() => {
  nextTick(() => {
    const aArr = markdown.value.$refs.vShowContent.querySelectorAll('a')
    // console.log(
    //   'markdown--------markdown',
    //   markdown.value.$refs.vShowContent.querySelectorAll('a')
    // )
    const tocs_catalog: NodeItems = []
    for (let i = 0; i < aArr.length; i++) {
      if (aArr[i].id) {
        const href = aArr[i].id
        const name = aArr[i].parentNode.innerText
        tocs_catalog.push({
          href,
          name,
        })
      }
    }
    // console.log(tocs_catalog)
    tocs_catalog.forEach((item: NodeItem) => {
      tocs.value.push(item)
    })
    catalog.update_doc_catalog(tocs.value)
    // console.log('ref-tocs', tocs.value)
  })
})
</script>

<style scoped></style>
