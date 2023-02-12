<template>
  <ElSwitch
    v-if="type === 'switch'"
    ref="editor"
    size="small"
    :model-value="value"
    :before-change="beforeChange"
    :loading="is_submiting"
    :disabled="is_disabled"
  />
  <template v-else-if="type === 'input'">
    <ElInput
      v-if="is_editing"
      ref="editor"
      class="max-w-[10rem]"
      size="small"
      :model-value="new_value"
      :disabled="is_disabled"
      @input="val => (new_value = val)"
      @keydown.enter="onChange"
    >
      <template #append>
        <ElButton
          size="small"
          type="danger"
          :icon="Close"
          :loading="is_submiting"
          :disabled="is_disabled"
          @click="is_editing = false"
        />
      </template>
      <template #prepend>
        <ElButton
          size="small"
          type="success"
          :icon="Check"
          :loading="is_submiting"
          :disabled="is_disabled"
          @click="onChange"
        />
      </template>
    </ElInput>
    <span
      v-else
      class="max-w-[10rem]"
      @dblclick=";(is_editing = true), (new_value = value)"
    >
      {{ value || '-'.repeat(7) }}
    </span>
  </template>
</template>

<script lang="ts" setup>
import { Check, Close } from '@element-plus/icons-vue'
interface DataEditorProps<Row extends DB.WriteAble = DB.WriteAble> {
  row: Row
  rowKey: keyof Row | string
  type: 'switch' | 'input'
}
const props = defineProps<DataEditorProps>()
const emit = defineEmits<{
  (e: 'change', value: any, time: Date): void
}>()

const is_submiting = ref(false)
const is_disabled = ref(false)
const is_editing = ref(false)
const editor = ref()

// @ts-expect-error
const value = computed(() => props.row[props.rowKey])
const new_value = ref()

const beforeChange = async () => {
  is_submiting.value = true
  if (props.type === 'switch') new_value.value = !value.value
  const result = await $fetch('/api/label/tabs/:id', {
    method: 'post',
    params: { id: props.row.id },
    body: {
      [props.rowKey]: new_value.value,
    },
  })
  if (result.code) return false
  emit('change', new_value.value, new Date(result.data.update_time))
  is_submiting.value = false
  is_disabled.value = true
  setTimeout(() => (is_disabled.value = false), 5000)
  return true
}

const onChange = async () => {
  console.log(editor.value, value, new_value)
  try {
    if (new_value.value !== value.value) await beforeChange()
  } finally {
    is_editing.value = false
  }
}
</script>

<style lang="postcss" scoped></style>
