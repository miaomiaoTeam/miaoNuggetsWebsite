<template>
  <NuxtLayout name="administar">
    <AdminDataTable
      :table-data="users.list"
      :table-columns="user_columns"
      :before-close-drawer="submitUserPut"
      :update-time="users.update_time"
      editor-request-url="/api/auth/user/:id"
      :search-props="['nickname']"
      @refresh="users.refresh"
      @remove="users.remove"
    >
      <template #drawer>
        <ElForm
          ref="user_form_ref"
          label-width="7em"
          :model="user_form_data"
          :rules="user_form_rules"
        >
          <ElFormItem label="昵称" prop="nickname">
            <ElInput v-model="user_form_data.nickname" size="small" />
          </ElFormItem>
          <ElFormItem label="介绍" prop="introduce">
            <ElInput v-model="user_form_data.introduce" size="small" />
          </ElFormItem>
          <ElFormItem label="职业" prop="occupation">
            <ElInput v-model="user_form_data.occupation" size="small" />
          </ElFormItem>
          <ElFormItem label="身份" prop="identity">
            <ElInput v-model="user_form_data.identity" size="small" />
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
const users = useUserList()

const user_columns = reactive<Client.Admin.tableColumn[]>([
  { label: '账号', prop: 'username' },
  { label: '密码', prop: 'password', editor: 'input' },
  {
    label: '昵称',
    prop: 'nickname',
    editor: 'input',
  },
  {
    label: '角色',
    prop: 'role',
    editor: 'input',
    filter: {
      options: [
        { text: '无', value: 'none' },
        { text: '作者', value: 'author' },
      ],
      multiple: false,
    },
  },
  { label: '等级', prop: 'level' },
  { label: '经验', prop: 'exp' },
  { label: '职业', prop: 'occupation', editor: 'input' },
  { label: '身份', prop: 'identity', editor: 'input' },
  { label: '介绍', prop: 'introduce', editor: 'input' },
  { label: '主页', prop: 'homepage', editor: 'input' },
  { label: 'GitHub', prop: 'github', editor: 'input' },
])

const user_form_ref = ref<FormInstance>()
const initUserFormData = () => ({
  nickname: '',
  introduce: '',
  occupation: '',
  identity: '',
})
const user_form_data = ref(initUserFormData())
const user_form_rules = reactive<FormRules>({
  nickname: [{ required: true, message: '请输入标签名称' }],
})
const submitUserPut = async () => {
  await user_form_ref.value?.validate()
  await users.new(user_form_data.value)
  user_form_data.value = initUserFormData()
}
</script>
