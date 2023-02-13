<template>
  <div class="bg-[#f4f5f5] pt-[21px]">
    <!-- pc端 -->
    <div class="hidden postLep:block">
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
          <div class="h-[10px] w-[300px] bg-[white]"></div>
          <postDetailCatalog />
        </div>
      </div>
    </div>
    <!-- mobile端 -->
    <div class="block postLep:hidden">
      <!-- panel -->
      <div class="w-full z-10">
        <postDetailSuspendPanel />
      </div>
      <!-- 文章详情 -->
      <div class="z-0">
        <postDetailContent></postDetailContent>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute()
console.log('route.params.id', route.params.id)
</script>
