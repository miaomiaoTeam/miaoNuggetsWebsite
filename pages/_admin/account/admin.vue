<template>
  <NuxtLayout name="administar">
    <ElTable></ElTable>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['admin-auth'],
})
</script>
