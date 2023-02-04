<template>
  <!-- PC端 -->
  <div class="hidden postLep:hidden postDes:block">
    <div class="fixed top-[140px]">
      <ul>
        <li v-for="(item, index) in panelList_pc" :key="index">
          <div v-if="item.type === 'badge'">
            <el-badge
              :value="item.count"
              class="item"
              type="primary"
              :max="199"
            >
              <el-button class="btn">
                <img :src="item.src ?? ''" class="w-8"
              /></el-button>
            </el-badge>
          </div>
          <div v-else class="mb-5">
            <el-divider />
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- 移动端 -->
  <div class="block postLep:hidden postDes:hidden">
    <div class="fixed flex bottom-0 justify-between">
      <div>123</div>
      <div>456</div>
      <div>789</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
interface panelListOption {
  type: 'badge' | 'divider'
  src: string
  count?: number
}
const panelList_pc = ref<panelListOption[]>([
  { src: '/svg/page_zan_pc.svg', type: 'badge', count: 10 },
  { src: '/svg/page_comment_pc.svg', type: 'badge', count: 178 },
  { src: '/svg/page_collect_pc.svg', type: 'badge' },
  { src: '/svg/page_share.svg_pc', type: 'badge' },
  { src: '', type: 'divider' },
  { src: '/svg/page_report_pc.svg', type: 'badge' },
  { src: '/svg/page_immerse_pc.svg', type: 'badge' },
])
// const panelList = ref([
//   { src: '/svg/page_zan.svg', count: 10 },
//   { src: '/svg/page_comment.svg', count: 178 },
//   { src: '/svg/page_collect.svg' },
// ])
</script>
<style scoped>
.btn {
  @apply rounded-full w-12 h-12 mb-5;
}
/* 按钮和图标上的数字 */
:deep(.el-badge__content--primary) {
  background: #b2bac2;
  right: 15px;
  top: 5px;
}
</style>
