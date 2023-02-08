<template>
  <ElContainer class="w-screen h-screen">
    <ElHeader class="flex items-center">
      <div class="text-xl">
        <img class="w-[1em] mr-2.5 inline-block" :src="icon" />
        <span>喵队掘金管理系统</span>
      </div>
      <div class="flex-auto"></div>
      <ElButton @click="account.logout()">退出登录</ElButton>
      <DarkControl />
    </ElHeader>
    <ElMain class="!flex flex-row">
      <ElMenu class="el-menu-vertical" :collapse="is_menu_collapse">
        <ElSubMenu index="/_admin/account">
          <template #title>
            <ElIcon>
              <User />
            </ElIcon>
            <span>账号管理</span>
          </template>
          <ElMenuItem index="/_admin/account/admin">管理员</ElMenuItem>
        </ElSubMenu>
      </ElMenu>
      <div>
        <slot />
      </div>
    </ElMain>
  </ElContainer>
</template>

<script lang="ts" setup>
import { User } from '@element-plus/icons-vue'
import { useAccount } from 'stores/account'
const account = useAccount()

const icon =
  'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg'

/** 菜单是否折叠 */
const is_menu_collapse = ref(false)
</script>

<style lang="postcss" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
