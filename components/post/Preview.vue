<template>
  <div class="z-0 relative">
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

onMounted(() => {
  nextTick(() => {
    const aArr = markdown.value?.$refs.vShowContent.querySelectorAll('a')
    // console.log(
    //   'markdown--------markdown',
    //   markdown.value.$refs.vShowContent.querySelectorAll('a')
    // )
    const tocs_catalog: NodeItems = []
    for (let i = 0; i < aArr.length; i++) {
      if (aArr[i].id) {
        // const href = aArr[i].id
        // const name = aArr[i].parentNode.innerText
        // // console.log('aArr[i].parentNode', aArr[i].parentNode)
        // const tag = aArr[i].parentNode.tagName.replace(/H/gi, '')
        aArr[i].parentNode.classList = 'site'
        // tocs_catalog.push({
        //   href,
        //   name,
        //   tag,
        // })
      }
    }
    // console.log('tocs_catalog', tocs_catalog)
    tocs_catalog.forEach((item: NodeItem) => {
      tocs.value.push(item)
    })
    // console.log('tocs.value', tocs.value)
    catalog.update_doc_catalog(tocs.value)
    // console.log('ref-tocs', tocs.value)
  })
})
</script>

<style scoped></style>
