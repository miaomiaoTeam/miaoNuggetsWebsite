<template>
  <div class="bg-[#f4f5f5] pt-[21px]">
    <div class="flex max-w-[1140px] mx-auto postLep:gap-5">
      <!-- 悬浮panel -->
      <div class="postDes:mr-[-20px]">
        <postDetailSuspendPanel />
      </div>
      <!-- 文章详情 -->
      <div class="flex-1 postDes:ml-[90px]">
        <postDetailContent></postDetailContent>
      </div>
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
