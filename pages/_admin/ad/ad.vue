<template>
  <NuxtLayout name="administar">
    <AdminDataTable
      :table-data="tabs_list"
      :table-columns="tabs_columns"
      :before-close-drawer="submitTabsLabelPut"
      editor-request-url="/api/ad/:id"
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
          <ElFormItem label="图片" prop="cover_image">
            <ElInput v-model="tabs_form_data.cover_image" size="small" />
          </ElFormItem>
          <ElFormItem label="链接" prop="link">
            <ElInput v-model="tabs_form_data.link" size="small" />
          </ElFormItem>
          <ElFormItem>
            <ElCheckbox
              v-model="tabs_form_data.is_show"
              label="是否在列表显示"
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
  () => $fetch('/api/ad/list'),
  { server: false, lazy: true }
)
const tabs_list = ref<DB.ADList[]>([])
onMounted(() => {
  watch(data, vals => {
    if (vals) tabs_list.value = vals.data
  })
  watchEffect(() => console.log(tabs_list))
  refresh()
})
const tabs_columns = reactive<Client.Admin.tableColumn[]>([
  { label: '标签', prop: 'cover_image', editor: 'input', width: '120' },
  { label: '链接', prop: 'link', editor: 'input', width: '240' },
  {
    label: '展示',
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
])

const tabs_form_ref = ref<FormInstance>()
const initTabsFormData = () => ({
  cover_image: '',
  link: '',
  is_show: true,
})
const tabs_form_data = ref(initTabsFormData())
const tabs_form_rules = reactive<FormRules>({
  cover_image: [{ required: true, message: '请上传图片' }],
  link: [{ required: true, message: '请输入链接' }],
})
const submitTabsLabelPut = async () => {
  await tabs_form_ref.value?.validate()
  const body = { ...tabs_form_data.value } as RQ.NewADPut
  if (body.is_show) delete body.is_show
  const result = await $fetch('/api/ad/new', { method: 'put', body })
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
