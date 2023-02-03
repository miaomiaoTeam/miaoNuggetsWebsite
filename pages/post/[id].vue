<template>
  <div class="bg-[#f4f5f5] pt-[21px]">
    <div class="flex postLep:gap-5">
      <!-- 左侧悬浮panel -->
      <div class="hidden postLep:hidden postDes:block">
        <!-- <post-detail-suspend-panel></post-detail-suspend-panel> -->
      </div>
      <!-- 文章详情 -->
      <div class="flex-1"><postDetailContent></postDetailContent></div>
      <!-- 右侧栏 -->
      <div>
        <!-- <post-detail-author></post-detail-author>
          <post-detail-ad></post-detail-ad>
          <post-detail-related></post-detail-related>
          <post-detail-catalog></post-detail-catalog> -->
        <aside
          class="w-[300px] h-[300px] bg-[#ffffff] hidden postLep:block"
        ></aside>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute()
console.log('route.params.id', route.params.id)
</script>
