<template>
  <ElSwitch
    v-if="type === 'switch'"
    ref="editor"
    size="small"
    :model-value="show_value"
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
    <span v-else class="max-w-[10rem]" @dblclick="openEditor">
      {{ show_value || '-'.repeat(7) }}
    </span>
  </template>
  <template v-else-if="type === 'select'">
    <template v-if="is_editing && _select">
      <ElSelect
        ref="editor"
        class="max-w-[10rem]"
        size="small"
        :model-value="new_value"
        :multiple="_select.multiple"
        :disabled="is_disabled"
        @change="val => (new_value = val)"
        @keydown.enter="onChange"
      >
        <ElOption
          v-for="item in _select.options"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
      <ElButton
        class="ml-2.5"
        size="small"
        type="success"
        :icon="Check"
        :loading="is_submiting"
        :disabled="is_disabled"
        @click="onChange"
      />
    </template>
    <span v-else class="max-w-[10rem]" @dblclick="openEditor">
      {{ show_value || '未选择' }}
    </span>
  </template>
</template>

<script lang="ts" setup>
import { Check, Close } from '@element-plus/icons-vue'
import type { NitroFetchRequest } from 'nitropack'
interface DataEditorProps<Row extends DB.WriteAble = DB.WriteAble> {
  row: Row
  rowKey: keyof Row | string
  type: Required<Client.Admin.tableColumn>['editor']
  url: NitroFetchRequest
  select?: Client.Admin.tableColumn['select']
}
const props = defineProps<DataEditorProps>()
const emit = defineEmits<{
  (e: 'change', value: any, time: Date): void
}>()

const _select = computed(() => {
  if (!props.select) return
  const options = props.select.options()
  const multiple = props.select.multiple
  return { options, multiple }
})

const is_submiting = ref(false)
const is_disabled = ref(false)
const is_editing = ref(false)
const editor = ref()
const openEditor = async () => {
  is_editing.value = true
  new_value.value = value.value
  await nextTick()
  editor.value?.focus?.()
}

// @ts-expect-error
const value = computed(() => props.row[props.rowKey])
const show_value = computed(() => {
  // @ts-expect-error
  const value = props.row[props.rowKey]
  if (_select.value) {
    if (Array.isArray(value))
      return value
        .map(v => _select.value?.options.find(o => o.value === v)?.label)
        .join()
    else return _select.value?.options.find(o => o.value === value)?.label
  }
  return value
})
const new_value = ref()

const beforeChange = async () => {
  try {
    is_submiting.value = true
    if (props.type === 'switch') new_value.value = !value.value
    const result = await $fetch<{
      code: number
      message: string
      data: {
        update_time: Date
      }
    }>(props.url, {
      method: 'post',
      params: { id: props.row.id },
      body: {
        [props.rowKey]: new_value.value,
      },
    })
    if (result.code) {
      ElMessage.error(result.message)
      return false
    }
    emit('change', new_value.value, new Date(result.data.update_time))
    return true
  } catch (error) {
    return false
  } finally {
    is_submiting.value = false
    is_disabled.value = true
    setTimeout(() => (is_disabled.value = false), 5000)
  }
}
const onChange = async () => {
  try {
    if (Array.isArray(new_value.value) && Array.isArray(value.value)) {
      for (let index = 0; true; index++) {
        const new_val = new_value.value[index]
        const old_val = value.value[index]
        if (new_val === undefined && old_val === undefined) break
        if (new_val !== old_val) {
          await beforeChange()
          break
        }
      }
    } else if (new_value.value !== value.value) await beforeChange()
  } finally {
    is_editing.value = false
  }
}
</script>

<style lang="postcss" scoped></style>
