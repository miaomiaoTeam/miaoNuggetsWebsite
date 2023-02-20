<template>
  <ElConfigProvider :locale="zhCn">
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import 'element-plus/theme-chalk/dark/css-vars.css'
const layout = 'custom'
</script>
