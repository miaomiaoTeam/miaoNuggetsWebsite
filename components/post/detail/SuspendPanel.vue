<template>
  <!-- PC端 -->
  <div class="hidden postLep:hidden postDes:block">
    <div class="fixed top-[140px]">
      <ul>
        <li v-for="(item, index) in panelList_pc" :key="index">
          <div v-if="item.type === 'badge'">
            <el-badge :value="item.data" class="item" type="primary" :max="199">
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
  <div class="block postLep:hidden">
    <div
      class="fixed bottom-0 flex justify-around items-center w-full z-10 px-6 bg-white h-12"
    >
      <div v-for="(item, index) in panelList" :key="index">
        <el-button text class="flex justify-center items-center">
          <img :src="item.src ?? ''" alt="" class="h-6" />
          <span class="text-sm font-medium text-[#8a93a0]">{{
            item.data
          }}</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
interface panelListOption {
  type: 'badge' | 'divider' | 'text'
  src: string
  data?: number | string
}
const panelList_pc = ref<panelListOption[]>([
  { src: '/svg/page_zan_pc.svg', type: 'badge', data: 10 },
  { src: '/svg/page_comment_pc.svg', type: 'badge', data: 178 },
  { src: '/svg/page_collect_pc.svg', type: 'badge' },
  { src: '/svg/page_share_pc.svg', type: 'badge' },
  { src: '', type: 'divider' },
  { src: '/svg/page_report_pc.svg', type: 'badge' },
  { src: '/svg/page_immerse_pc.svg', type: 'badge' },
])
const panelList = ref<panelListOption[]>([
  { src: '/svg/page_zan.svg', type: 'badge', data: 10 },
  { src: '/svg/page_comment.svg', type: 'badge', data: 178 },
  { src: '/svg/page_collect.svg', type: 'text', data: '收藏' },
])
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
