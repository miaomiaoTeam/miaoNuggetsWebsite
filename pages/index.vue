<template>
  <div class="bg-[#f4f5f5] pt-[63px]">
    <div class="flex gap-5 max-w-[960px] mx-auto">
      <!-- 文章列表 -->
      <div class="flex-1">
        <postList />
      </div>
      <!-- 右侧栏 -->
      <div class="hidden homeLep:block">
        <postHomeAdBanner :w="240" />
        <postHomeAuthorRank />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
