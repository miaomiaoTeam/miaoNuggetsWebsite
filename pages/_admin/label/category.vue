<template>
  <NuxtLayout name="administar">
    <AdminDataTable
      :table-data="categorys.list"
      :table-columns="category_columns"
      :before-close-drawer="submitCategoryPut"
      :update-time="categorys.update_time"
      editor-request-url="/api/label/category/:id"
      :search-props="['label', 'alias']"
      @refresh="categorys.refresh()"
      @remove="categorys.remove"
    >
      <template #drawer>
        <ElForm
          ref="category_form_ref"
          label-width="7em"
          :model="category_form_data"
          :rules="category_form_rules"
        >
          <ElFormItem label="标签名" prop="label">
            <ElInput v-model="category_form_data.label" size="small" />
          </ElFormItem>
          <ElFormItem label="别名" prop="alias">
            <ElInput v-model="category_form_data.alias" size="small" />
          </ElFormItem>
          <ElFormItem label="图标" prop="icon">
            <ElInput v-model="category_form_data.icon" size="small" />
          </ElFormItem>
          <ElFormItem>
            <ElCheckbox
              v-model="category_form_data.is_show"
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
import { useCategoryList } from 'stores/_admin/category'
definePageMeta({
  middleware: ['admin-auth'],
})
const categorys = useCategoryList()

const category_columns = reactive<Client.Admin.tableColumn[]>([
  { label: '标签', prop: 'label', editor: 'input', width: '120' },
  { label: '别名', prop: 'alias', editor: 'input', width: '120' },
  { label: '图标', prop: 'icon', editor: 'input', width: '240' },
  { label: '文章数', prop: 'article', width: '90' },
  {
    label: '列表显示',
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

const category_form_ref = ref<FormInstance>()
const initCategoryFormData = () => ({
  label: '',
  alias: '',
  icon: '',
  is_show: true,
})
const category_form_data = ref(initCategoryFormData())
const category_form_rules = reactive<FormRules>({
  label: [{ required: true, message: '请输入标签名称' }],
  alias: [{ required: true, message: '请输入别名' }],
  icon: [{ required: true, message: '请上传图标' }],
})
const submitCategoryPut = async () => {
  await category_form_ref.value?.validate()
  await categorys.new(category_form_data.value)
  category_form_data.value = initCategoryFormData()
}
</script>
