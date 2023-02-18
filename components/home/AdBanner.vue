<template>
  <el-row v-for="item in itemms" :key="item.id" :span="8">
    <nuxt-link :to="item.link">
      <el-image :src="item.src" style="width: 240px" />
    </nuxt-link>
  </el-row>
  <el-card style="width: 240px">
    <el-row>
      <el-col :span="6">
        <el-image :src="CardImgSrc" />
      </el-col>
      <el-col :span="18">
        <div class="font-bold text-[14px]">下载稀土掘金APP</div>
        <div class="text-gray-500 text-[12px]">一个帮助开发者成长的社区</div>

        <!-- <h3 style="font-weight: bold; font-size: 14px">下载稀土掘金APP</h3>
        <h3 style="font-size: 8px">一个帮助开发者成长的社区</h3> -->
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
const itemms = ref([
  {
    id: '1',
    src: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19295f33a645415fbb8e43c4b194d89e~tplv-k3u1fbpfcp-no-mark:480:400:0:0.awebp?',
    link: '/',
  },
  {
    id: '2',
    src: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19295f33a645415fbb8e43c4b194d89e~tplv-k3u1fbpfcp-no-mark:480:400:0:0.awebp?',
    link: '/',
  },
  {
    id: '3',
    src: 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19295f33a645415fbb8e43c4b194d89e~tplv-k3u1fbpfcp-no-mark:480:400:0:0.awebp?',
    link: '/',
  },
])
const CardImgSrc =
  'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/home.59780ae.png'
</script>
