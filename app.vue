<template>
  <ElConfigProvider :locale="zhCn">
    <NuxtPage />
  </ElConfigProvider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
</script>

<style lang="postcss"></style>
