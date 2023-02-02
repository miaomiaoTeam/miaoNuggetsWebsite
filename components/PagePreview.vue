<template>
  <div class="mavonEditor">
    <mavon-editor
      v-model="handbook"
      navigation
      default-open="preview"
      :toolbars-flag="false"
      :editable="false"
      :subfield="false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import preview from '@/content/docs/standards/git.md?raw'

const handbook = ref(preview)
</script>

<style scoped>
.mavonEditor {
  width: 100%;
  height: 100%;
}
</style>
