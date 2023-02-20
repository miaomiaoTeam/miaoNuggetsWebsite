<template>
  <div class="mb-5">
    <el-row v-for="item in itemms" :key="item.id" :span="8">
      <a :href="item.link">
        <el-image :src="item.src" :style="{ width: props.w + 'px' }" />
      </a>
    </el-row>
    <div :style="{ width: props.w + 'px' }">
      <el-card
        class="box-card"
        body-style="padding: 0px; background-color: white; "
      >
        <div class="flex p-3">
          <img :src="CardImgSrc" alt="" class="w-[50px] h-[50px] mr-4" />
          <div>
            <div class="text-sm">下载稀土掘金APP</div>
            <div class="mt-[6px] text-[#808080] text-[12px]">
              一个帮助开发者成长的社区
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    w: number
  }>(),
  {
    w: 240,
  }
)
const itemms = ref([
  {
    id: '1',
    src: '/png/adBar.png',
    link: '/',
  },
])
const CardImgSrc = '/png/adQR.png'
</script>
<style scoped>
.el-card {
  margin-top: 6px;
  height: 80px;
}
.row-card {
  margin-top: -6px;
}
.el-col-image {
  margin-top: -9px;
  margin-left: -10px;
  width: 50px;
}
.first-sentence {
  margin-top: -8px;
  font-weight: bold;
  font-size: 14px;
}
.second-sentence {
  margin-top: 7px;
  font-size: 12px;
  color: #808080;
}
</style>
