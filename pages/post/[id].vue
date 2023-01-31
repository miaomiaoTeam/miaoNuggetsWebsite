<template>
  <div class="bg-[#f4f5f5] pt-[21px]">
    <!-- 移动端 -->
    <div class="block lg:hidden">
      <post-detail-content></post-detail-content>
    </div>
    <!-- PC端-->
    <div class="hidden lg:block">
      <div class="flex gap-[20px]">
        <!-- 左侧悬浮panel -->
        <div class="hidden lg:hidden xl:block">
          ss
          <!-- <post-detail-suspend-panel></post-detail-suspend-panel> -->
        </div>
        <!-- 文章详情 -->
        <div class="flex-1"><post-detail-content></post-detail-content></div>
        <!-- 右侧栏 -->
        <div>
          <!-- <post-detail-author></post-detail-author>
          <post-detail-ad></post-detail-ad>
          <post-detail-related></post-detail-related>
          <post-detail-catalog></post-detail-catalog> -->
          <div class="w-[300px] h-[300px] bg-[#ffffff]"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute()
console.log('route.params.id', route.params.id)
</script>
