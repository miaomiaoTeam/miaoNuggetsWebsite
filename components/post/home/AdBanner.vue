<template>
  <div class="mb-5">
    <el-row v-for="ad in ad_list.data" :key="ad.id" :span="8">
      <NuxtLink :to="ad.link">
        <ElImage
          class="ad_img"
          :src="ad.cover_image"
          :style="{ width: width + 'px' }"
        />
      </NuxtLink>
    </el-row>
    <div :style="{ width: width + 'px' }">
      <el-card
        class="box-card"
        body-style="padding: 0px; background-color: white;"
      >
        <div class="flex p-3">
          <img :src="ad_qr" alt="稀土掘金APP" class="w-[50px] h-[50px] mr-4" />
          <div>
            <span class="text-sm">下载稀土掘金APP</span>
            <span class="mt-[6px] text-[#808080] text-[12px]">
              一个帮助开发者成长的社区
            </span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
withDefaults(
  defineProps<{
    width: number
  }>(),
  {
    width: 240,
  }
)
const ad_list = await $fetch('/api/ad/list')
const ad_qr = '/png/adQR.png'
</script>
<style lang="postcss" scoped>
.ad_img::after {
  content: '广告';
  @apply absolute right-[1rem] bottom-[1rem] z-10;
  @apply px-1 bg-[rgba(0,0,0,.2)];
  @apply border rounded-[5px] border-white;
  @apply text-white text-xs;
}
</style>
