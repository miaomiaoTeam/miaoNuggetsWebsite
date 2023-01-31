<template>
  <div>
    <!-- 移动端 -->
    <div class="block md:hidden">
      <post-detail-content></post-detail-content>
    </div>
    <!-- PC端-->
    <div class="hidden md:block"></div>
  </div>
</template>
<script lang="ts" setup>
const route = useRoute()
console.log('route.params.id', route.params.id)
</script>
