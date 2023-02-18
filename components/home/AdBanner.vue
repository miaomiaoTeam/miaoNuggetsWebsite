<template>
  <div>
    <el-row>
      <el-col v-for="item in itemms" :key="item.id" :span="8">
        <nuxt-link :to="item.link">
          <el-image :src="item.src" style="width: 240px" />
        </nuxt-link>
      </el-col>
    </el-row>
    <el-card style="width: 240px">
      <el-row>
        <el-col :span="12">
          <el-image :src="CardImgSrc" />
        </el-col>
        <el-col :span="12">
          <h3 style="font-weight: bold; font-size: larger">下载稀土掘金APP</h3>
          <p>一个帮助开发者成长的社区</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup lang="ts">
const itemms = ref([
  { id: '1', src: '../../assets/ad.webp', link: '/' },
  { id: '2', src: '../../assets/ad.webp', link: '/' },
  { id: '3', src: '../../assets/ad.webp', link: '/' },
])
const CardImgSrc = '../../assets/ad.webp'
</script>
