<template>
  <NuxtLayout name="administar">
    <ElCard class="signin-card">
      <template #header>
        <div class="flex justify-between">
          <span>登录</span>
          <ElButton :icon="ArrowRight" @click="signin()" />
        </div>
      </template>
      <ElForm
        ref="signin_form_ref"
        :model="signin_form_data"
        :rules="signin_form_rules"
        size="large"
      >
        <ElFormItem label="账号" prop="username">
          <ElInput v-model="signin_form_data.username" clearable />
        </ElFormItem>
        <ElFormItem label="密码" prop="password">
          <ElInput
            v-model="signin_form_data.password"
            clearable
            show-password
          />
        </ElFormItem>
      </ElForm>
    </ElCard>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import { useAccount } from 'stores/account'
definePageMeta({
  middleware: ['admin-auth'],
})

const signin_form_data = reactive<RQ.SignInPost>({
  username: '',
  password: '',
})
const signin_form_rules = reactive<FormRules>({
  username: [{ required: true, message: '请输入账号' }],
  password: [{ required: true, message: '请输入密码' }],
})
const signin_form_ref = ref<FormInstance>()

const signin = async () => {
  await signin_form_ref.value?.validate()
  const account = useAccount()
  await account.signin(signin_form_data)
  await navigateTo('/_admin/account/admin')
}
</script>

<style lang="postcss">
.signin-card {
  @apply absolute;
  @apply left-1/2 top-1/2;
  @apply -translate-x-1/2 -translate-y-1/2;
  @apply max-w-[50rem] w-3/4 lg:w-2/3 2xl:w-1/2;
}
</style>
