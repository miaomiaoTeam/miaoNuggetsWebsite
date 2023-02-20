<template>
  <div class="w-full bg-white">
    <div class="px-[24px] pt-[32px]">
      <!-- 标题 -->
      <div class="text-[32px] font-semibold leading-[42px] mb-5">标题</div>
      <!-- 作者信息 -->
      <div class="flex items-end mb-5">
        <a href="" class="w-[51px] h-10">
          <img
            class="rounded-full w-10 h-10"
            src="https://p3-passport.byteimg.com/img/user-avatar/89db7db9a82487e9a26011b2624920f8~100x100.awebp"
            alt=""
        /></a>
        <div class="flex-1">
          <div class="text-base font-medium text-[#515767]">
            张三_北京
            <img
              src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/lv-6.b69935b.png"
              alt=""
              class="inline-block w-[35px] h-4"
            />
          </div>
          <div class="text-sm text-[#8a919f]">
            2022年11月22日 11:06 · 阅读 47860
          </div>
        </div>
        <div>
          <elButton type="primary" plain> + 关注</elButton>
        </div>
      </div>
      <!-- 文章详情 -->
      <div>
        <!-- <postPreview></postPreview> -->
        <slot><postPreview /></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  const aArr = document.querySelectorAll('h2,h3,h4,h5,h6')
  aArr.forEach(item => {
    item.classList.add('site')
  })
})
</script>

<style scoped></style>
