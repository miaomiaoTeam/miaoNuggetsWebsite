<template>
  <el-row v-for="item in itemms" :key="item.id" :span="8">
    <nuxt-link :to="item.link">
      <el-image :src="item.src" style="width: 240px" />
    </nuxt-link>
  </el-row>
  <el-card class="el-card" style="width: 240px">
    <el-row class="el-row-card">
      <el-col :span="6">
        <el-image class="el-col-image" :src="CardImgSrc" />
      </el-col>
      <el-col :span="18">
        <div class="first-sentence">下载稀土掘金APP</div>
        <div class="second-sentence">一个帮助开发者成长的社区</div>
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
  height: 50px;
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
