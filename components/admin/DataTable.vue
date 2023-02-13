<template>
  <div class="h-[60px] flex items-center">
    <ElButton type="primary" @click="$emit('refresh')">
      <ElIcon><Refresh /></ElIcon>
      <span>刷新</span>
    </ElButton>
    <ElButton plain @click="openDrawer">
      <ElIcon><CirclePlus /></ElIcon>
      <span>新增</span>
    </ElButton>
    <ElInput class="max-w-[10rem] ml-2.5">
      <template #append>
        <ElButton :icon="Search" />
      </template>
    </ElInput>
  </div>
  <ElTable
    class="w-full max-h-[calc(100%-60px)]"
    stripe
    table-layout="auto"
    :data="tableData"
    @selection-change="handleSelectChange"
  >
    <ElTableColumn type="selection" width="55" />
    <ElTableColumn label="序号" prop="id" fixed="left" />
    <ElTableColumn
      v-for="column of tableColumns"
      :key="column.prop"
      :label="column.label"
      :prop="column.prop"
    >
      <template #default="{ row }">
        <AdminDataEditor
          v-if="column.editor"
          :row="row"
          :row-key="column.prop"
          :type="column.editor"
          @change="(val, time) => editTabData(row, column.prop, val, time)"
        />
      </template>
    </ElTableColumn>
    <ElTableColumn label="创建时间" prop="create_time">
      <template #default="{ row }">
        <TimeTags :time="row.create_time" />
      </template>
    </ElTableColumn>
    <ElTableColumn v-if="showUpdateTime" label="修订时间" prop="update_time">
      <template #default="{ row }">
        <TimeTags :time="row.update_time" />
      </template>
    </ElTableColumn>
    <ElTableColumn v-if="showActions" fixed="right">
      <template #header>
        <ElButton
          size="small"
          type="danger"
          :icon="Delete"
          :disabled="!select_rows.length"
          @click="$emit('remove', select_rows)"
        />
      </template>
      <template #default="scope">
        <ElButton
          size="small"
          type="danger"
          :icon="Delete"
          @click="$emit('remove', scope.row.id)"
        />
      </template>
    </ElTableColumn>
  </ElTable>
  <ClientOnly>
    <ElDrawer
      v-model="tabs_drawer_show"
      :title="tabsDrawerTilte"
      destroy-on-close
    >
      <slot name="drawer" />
      <template #footer>
        <ElButton v-if="clearDrawer" plain @click="clearDrawer">
          重置
        </ElButton>
        <ElButton type="success" @click="closeDrawer">提交</ElButton>
      </template>
    </ElDrawer>
  </ClientOnly>
</template>

<script lang="tsx" setup>
import { ElTag } from 'element-plus'
import { Refresh, CirclePlus, Delete, Search } from '@element-plus/icons-vue'
const props = withDefaults(
  defineProps<{
    tableData: any[]
    tableColumns: Client.Admin.tableColumn[]
    showUpdateTime?: boolean
    showActions?: boolean
    tabsDrawerTilte?: string
    beforeOpenDrawer?: () => MaybePromise<Error | boolean | void>
    beforeCloseDrawer?: () => MaybePromise<Error | boolean | void>
    clearDrawer?: () => {}
  }>(),
  {
    showUpdateTime: true,
    showActions: true,
    tabsDrawerTilte: '数据表单',
    beforeOpenDrawer: undefined,
    beforeCloseDrawer: undefined,
    clearDrawer: undefined,
  }
)
defineEmits<{
  (e: 'refresh'): void
  (e: 'drawer-close'): void
  (e: 'remove', id: MaybeArray<number>): void
}>()

const tabs_drawer_show = ref(false)
const openDrawer = async () => {
  const fn = props.beforeOpenDrawer
  if (fn) {
    const res = await fn()
    if (res instanceof Error) {
      ElMessage.error(res.message)
      return
    }
    if (res === false) return
  }
  tabs_drawer_show.value = true
}
const closeDrawer = async () => {
  const fn = props.beforeCloseDrawer
  if (fn) {
    try {
      const res = await fn()
      if (res instanceof Error) {
        ElMessage.error(res.message)
        return
      }
      if (res === false) return
    } catch (err) {
      return
    }
  }
  tabs_drawer_show.value = false
}

const TimeTags = defineComponent({
  name: 'TimeTags',
  props: {
    time: {
      type: [String, Date],
      default: () => '',
    },
  },
  setup: props => {
    const time = computed(() => new Date(props.time))
    const years = computed(() => String(time.value.getFullYear()))
    const months = computed(() =>
      String(time.value.getMonth() + 1).padStart(2, '0')
    )
    const days = computed(() => String(time.value.getDate()).padStart(2, '0'))
    const hours = computed(() => String(time.value.getHours()).padStart(2, '0'))
    const minutes = computed(() =>
      String(time.value.getMinutes()).padStart(2, '0')
    )
    const seconds = computed(() =>
      String(time.value.getSeconds()).padStart(2, '0')
    )
    return () => (
      <div class="flex flex-col">
        <ElTag>{`${years.value}/${months.value}/${days.value}`}</ElTag>
        <ElTag class="mt-2.5">{`${hours.value}:${minutes.value}:${seconds.value}`}</ElTag>
      </div>
    )
  },
})

const select_rows = ref<number[]>([])
const handleSelectChange = (vals: DB.WriteAble[]) => {
  select_rows.value = vals.map(({ id }) => id)
}

interface EditTabDataFunc {
  <Row extends DB.WriteAble, Key extends keyof Row>(
    row: Row,
    key: Key,
    val: Row[Key],
    update_time: Date
  ): void
}
const editTabData: EditTabDataFunc = (row, key, val, update_time) => {
  row[key] = val
  row.update_time = update_time
}
</script>
