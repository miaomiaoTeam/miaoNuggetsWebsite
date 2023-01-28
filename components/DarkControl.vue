<template>
  <ElButton
    v-if="type === 'button'"
    :icon="is_dark ? Moon : Sunny"
    :circle="circle"
    @click="toggle_dark()"
  />
  <ElSwitch
    v-else-if="type === 'switch'"
    inline-prompt
    :active-icon="Moon"
    :inactive-icon="Sunny"
    :model-value="is_dark"
    @update:model-value="val => toggle_dark(Boolean(val))"
  />
</template>

<script lang="ts" setup>
import { Moon, Sunny } from '@element-plus/icons-vue'
withDefaults(
  defineProps<{
    type?: 'button' | 'switch'
    circle?: boolean
  }>(),
  { type: 'button', circle: true }
)

const { is_dark, toggle_dark } = useDarkControl()

onMounted(() => console.log('6666'))
</script>
