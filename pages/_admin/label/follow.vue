<template>
  <NuxtLayout name="administar">
    <AdminDataTable
      :table-data="follow_list"
      :table-columns="follow_columns"
      :before-close-drawer="submitFollowLabelPut"
      @refresh="refresh()"
      @remove="removeFollow"
    >
      <template #drawer>
        <ElForm
          ref="follow_form_ref"
          label-width="7em"
          :model="follow_form_data"
          :rules="follow_form_rules"
        >
          <ElFormItem label="标签名" prop="label">
            <ElInput v-model="follow_form_data.label" size="small" />
          </ElFormItem>
          <ElFormItem label="别名" prop="alias">
            <ElInput v-model="follow_form_data.alias" size="small" />
          </ElFormItem>
          <ElFormItem label="图标" prop="icon">
            <ElInput v-model="follow_form_data.icon" size="small" />
          </ElFormItem>
          <ElFormItem>
            <ElCheckbox
              v-model="follow_form_data.is_show"
              label="是否在全部标签列表显示"
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
  'FollowLabelList',
  () => $fetch('/api/label/follow/list'),
  { server: false, lazy: true }
)
const follow_list = ref<DB.FollowLabelList[]>([])
onMounted(() => {
  watch(data, vals => {
    if (vals) follow_list.value = vals.data
  })
  watchEffect(() => console.log(follow_list))
  refresh()
})
const follow_columns = reactive<Client.Admin.tableColumn[]>([
  { label: '标签', prop: 'label', editor: 'input' },
  { label: '别名', prop: 'alias', editor: 'input' },
  { label: '图标', prop: 'icon', editor: 'input' },
  { label: '关注数', prop: 'follow' },
  { label: '文章数', prop: 'article' },
  { label: '标签显示', prop: 'is_show', editor: 'switch' },
])

const follow_form_ref = ref<FormInstance>()
const initFollowFormData = () => ({
  label: '',
  alias: '',
  icon: '',
  is_show: true,
})
const follow_form_data = ref(initFollowFormData())
const follow_form_rules = reactive<FormRules>({
  label: [{ required: true, message: '请输入标签名称' }],
  alias: [{ required: true, message: '请输入别名' }],
  icon: [{ required: true, message: '请上传图标' }],
})
const submitFollowLabelPut = async () => {
  await follow_form_ref.value?.validate()
  const body = { ...follow_form_data.value } as RQ.NewFollowLabelPut
  if (body.is_show) delete body.is_show
  const result = await $fetch('/api/label/follow/new', { method: 'put', body })
  data.value?.data.push({
    ...result.data,
    ...follow_form_data.value,
    follow: 0,
    article: 0,
  })
  follow_form_data.value = initFollowFormData()
}

const removeFollow = async (id: MaybeArray<number>) => {
  try {
    await ElMessageBox.confirm('确认删除指定条目吗？', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    })
    await $fetch('/api/label/follow/remove', {
      method: 'delete',
      body: { id },
    })
    const id_set = new Set(Array.isArray(id) ? id : [id])
    for (let index = 0; index < follow_list.value.length; index++) {
      const { id } = follow_list.value[index]
      if (id_set.has(id)) {
        follow_list.value.splice(index, 1)
        index--
        id_set.delete(id)
      }
    }
  } catch (err) {}
}
</script>
