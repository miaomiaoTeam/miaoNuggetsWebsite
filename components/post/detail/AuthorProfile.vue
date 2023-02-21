<template>
  <div v-if="props" class="w-[300px] h-[300px]">
    <el-card shadow="never">
      <div class="flex pb-[17px]">
        <a href="">
          <img
            class="rounded-full w-12 h-12"
            src="https://p3-passport.byteimg.com/img/user-avatar/89db7db9a82487e9a26011b2624920f8~100x100.awebp"
            alt=""
        /></a>
        <div class="ml-4">
          <div class="text-base font-medium text-[#252933] mt-1">
            {{ props.nickName }}
            <img
              src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/lv-6.b69935b.png"
              alt=""
              class="inline-block w-[35px] h-4"
            />
          </div>
          <div class="text-sm font-normal text-[#515767]">
            {{ props.introDuce }}
          </div>
        </div>
      </div>
      <div class="flex justify-between gap-4">
        <el-button type="primary" class="flex-1">关注</el-button>
        <el-button type="primary" class="flex-1" plain>私信</el-button>
      </div>
      <el-divider />
      <div class="flex">
        <img src="/svg/page_author_zan.svg" class="mr-3" />
        获得点赞&nbsp;{{ props.beLiked }}
      </div>
      <div class="flex mt-2">
        <img src="/svg/page_author_viewed.svg" class="mr-3 w-[25px]" />
        文章被阅读数&nbsp;{{ props.beViewed }}
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  nickName: string
  introDuce: string
  beLiked: number
  beViewed: number
}>()
</script>
<style scoped></style>
