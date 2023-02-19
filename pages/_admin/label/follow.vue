<template>
  <NuxtLayout name="administar">
    <AdminDataTable
      :table-data="tags.list"
      :table-columns="follow_columns"
      :before-close-drawer="submitFollowLabelPut"
      editor-request-url="/api/label/follow/:id"
      :search-props="['label', 'alias']"
      :update-time="tags.update_time"
      @refresh="tags.refresh()"
      @remove="tags.remove"
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
import { useTagList } from 'stores/_admin/tag'
definePageMeta({
  middleware: ['admin-auth'],
})
const tags = useTagList()

const follow_columns = reactive<Client.Admin.tableColumn[]>([
  { label: '标签', prop: 'label', editor: 'input', width: '120' },
  { label: '别名', prop: 'alias', editor: 'input', width: '120' },
  { label: '图标', prop: 'icon', editor: 'input', width: '240' },
  { label: '关注数', prop: 'follow', width: '90' },
  { label: '文章数', prop: 'article', width: '90' },
  {
    label: '标签显示',
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
  await tags.new(follow_form_data.value)
  follow_form_data.value = initFollowFormData()
}
</script>
