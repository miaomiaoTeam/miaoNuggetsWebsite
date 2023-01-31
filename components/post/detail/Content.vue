<template>
  <div class="w-full bg-white">
    <div class="px-[24px] pt-[32px]">
      <!-- 标题 -->
      <div class="text-[32px] font-semibold leading-[42px] mb-[20px]">标题</div>
      <!-- 作者信息 -->
      <div class="flex items-end mb-[20px]">
        <a href="" class="w-[51px] h-[40px]">
          <img
            class="rounded-full w-[40px] h-[40px]"
            src="https://p3-passport.byteimg.com/img/user-avatar/89db7db9a82487e9a26011b2624920f8~100x100.awebp"
            alt=""
        /></a>
        <div class="flex-1">
          <div class="text-[16px] font-medium leading-[24px] text-[#515767]">
            张三_北京
            <img
              src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/lv-6.b69935b.png"
              alt=""
              class="inline-block w-[35px] h-[16px]"
            />
          </div>
          <div class="text-[12px] leading-[17px] text-[#8a919f]">
            2022年11月22日 11:06 · 阅读 47860
          </div>
        </div>
        <div>
          <el-button type="primary" plain> + 关注</el-button>
        </div>
      </div>
      <!-- 文章详情 -->
      <div>
        <post-preview></post-preview>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
