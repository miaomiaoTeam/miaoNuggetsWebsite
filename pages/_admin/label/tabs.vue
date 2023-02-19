<template>
  <NuxtLayout name="administar">
    <AdminDataTable
      :table-data="tabs_list"
      :table-columns="tabs_columns"
      :before-close-drawer="submitTabsLabelPut"
      editor-request-url="/api/label/tabs/:id"
      :search-props="['label', 'route', 'link', 'badge']"
      @refresh="refresh()"
      @remove="removeTabs"
    >
      <template #drawer>
        <ElForm
          ref="tabs_form_ref"
          label-width="7em"
          :model="tabs_form_data"
          :rules="tabs_form_rules"
        >
          <ElFormItem label="标签名" prop="label">
            <ElInput v-model="tabs_form_data.label" size="small" />
          </ElFormItem>
          <ElFormItem label="路由路径" prop="route">
            <ElInput v-model="tabs_form_data.route" size="small" />
          </ElFormItem>
          <ElFormItem label="外置链接" prop="link">
            <ElInput v-model="tabs_form_data.link" size="small" />
          </ElFormItem>
          <ElFormItem label="标记徽章" prop="badge">
            <ElInput v-model="tabs_form_data.badge" size="small" />
          </ElFormItem>
          <ElFormItem>
            <ElCheckbox
              v-model="tabs_form_data.is_show"
              label="是否在列表显示"
            />
          </ElFormItem>
          <ElFormItem>
            <ElCheckbox
              v-model="tabs_form_data.in_menu"
              label="是否在下拉菜单显示"
            />
          </ElFormItem>
        </ElForm>
      </template>
    </AdminDataTable>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
definePageMeta({
  middleware: ['admin-auth'],
})

const { data, refresh } = useAsyncData(
  'TabsLabelList',
  () => $fetch('/api/label/tabs/list'),
  { server: false, lazy: true }
)
const tabs_list = ref<DB.TabsLabelList[]>([])
onMounted(() => {
  watch(data, vals => {
    if (vals) tabs_list.value = vals.data
  })
  watchEffect(() => console.log(tabs_list))
  refresh()
})
const tabs_columns = reactive<Client.Admin.tableColumn[]>([
  { label: '标签', prop: 'label', editor: 'input', width: '60' },
  { label: '路由', prop: 'route', editor: 'input', width: '120' },
  { label: '链接', prop: 'link', editor: 'input', width: '240' },
  { label: '徽章', prop: 'badge', editor: 'input', width: '120' },
  {
    label: '顶部显示',
    prop: 'is_show',
    editor: 'switch',
    width: '120',
    filter: {
      options: [
        { text: '显示', value: true },
        { text: '隐藏', value: false },
      ],
      multiple: false,
    },
  },
  {
    label: '菜单显示',
    prop: 'in_menu',
    editor: 'switch',
    width: '120',
    filter: {
      options: [
        { text: '显示', value: true },
        { text: '隐藏', value: false },
      ],
      multiple: false,
    },
  },
])

const tabs_form_ref = ref<FormInstance>()
const initTabsFormData = () => ({
  label: '',
  route: '',
  link: '',
  badge: '',
  is_show: true,
  in_menu: true,
})
const tabs_form_data = ref(initTabsFormData())
const tabs_form_rules = reactive<FormRules>({
  label: [{ required: true, message: '请输入标签名称' }],
  route: [
    { required: true, message: '请输入路径' },
    { pattern: /^(?!http(s?):\/\/)/, message: '需指向页面内路径' },
  ],
})
const submitTabsLabelPut = async () => {
  await tabs_form_ref.value?.validate()
  const body = { ...tabs_form_data.value } as RQ.NewTabsLabelPut
  if (!body.link) delete body.link
  if (!body.badge) delete body.badge
  if (body.is_show) delete body.is_show
  if (body.in_menu) delete body.in_menu
  const result = await $fetch('/api/label/tabs/new', { method: 'put', body })
  data.value?.data.push({ ...result.data, ...tabs_form_data.value })
  tabs_form_data.value = initTabsFormData()
}

const removeTabs = async (id: MaybeArray<number>) => {
  try {
    await ElMessageBox.confirm('确认删除指定条目吗？', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    })
    await $fetch('/api/label/tabs/remove', {
      method: 'delete',
      body: { id },
    })
    const id_set = new Set(Array.isArray(id) ? id : [id])
    for (let index = 0; index < tabs_list.value.length; index++) {
      const { id } = tabs_list.value[index]
      if (id_set.has(id)) {
        tabs_list.value.splice(index, 1)
        index--
        id_set.delete(id)
      }
    }
  } catch (err) {}
}
</script>
