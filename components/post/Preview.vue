<template>
  <div class="w-full">
    <client-only>
      <mavon-editor
        v-model="handbook"
        default-open="preview"
        :toolbars-flag="false"
        :editable="false"
        :subfield="false"
        box-shadow-style="0 0 #0000"
        preview-background="#ffffff"
    /></client-only>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import preview from '@/content/docs/standards/git.md?raw'

const handbook = ref(preview)
</script>

<style scoped></style>
