<template>
  <div class="w-full bg-white">
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
    <el-divider border-style="solid" />
  </div>
</template>

<script setup lang="ts">
const sortItems = ref(['推荐', '最新', '热榜'])
</script>
<style scoped>
.el-divider--horizontal {
  margin: 3px 0;
  background: 0 0;
  border-top: 1px solid #e8eaec;
}
</style>
