<template>
  <div
    class="fixed top-8.75 left-9.25 bg-red-100 flex flex-col items-center justify-center w-8"
  >
    <!-- 上部分图标 -->
    <div class="bg-lime-400 rounded-full w-8 h-8 p-1.5 mb-6">
      <el-icon class="hover:text-gray-900" color="#8a919f"><Pointer /></el-icon>
    </div>
    <div class="bg-lime-400 rounded-full w-8 h-8 p-1.5 mb-6">
      <el-icon class="hover:text-gray-900" color="#8a919f"><Comment /></el-icon>
    </div>
    <div class="bg-lime-400 rounded-full w-8 h-8 p-1.5 mb-6">
      <el-icon class="hover:text-gray-900" color="#8a919f"
        ><StarFilled
      /></el-icon>
    </div>
    <div class="bg-lime-400 rounded-full w-8 h-8 p-1.5 mb-6">
      <el-icon class="hover:text-gray-900" color="#8a919f"><Share /></el-icon>
    </div>
    <!-- 分割线 -->
    <hr class="w-7 mb-6" />
    <!-- 下部分图标 -->
    <div class="bg-lime-400 rounded-full w-8 h-8 p-1.5 mb-6">
      <el-icon class="hover:text-gray-900" color="#8a919f"
        ><WarnTriangleFilled
      /></el-icon>
    </div>
    <div class="bg-lime-400 rounded-full w-8 h-8 p-1.5">
      <el-icon class="hover:text-gray-900" color="#8a919f"><Menu /></el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  Pointer,
  Comment,
  StarFilled,
  Share,
  WarnTriangleFilled,
  Menu,
} from '@element-plus/icons-vue'
const route = useRoute()
console.log('route.params.id', route.params.id)
</script>
