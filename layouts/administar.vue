<template>
  <ElContainer class="w-screen h-screen">
    <ElHeader class="flex items-center">
      <div class="text-xl">
        <img class="w-[1em] mr-2.5 inline-block" :src="icon" />
        <span>喵队项目管理系统</span>
      </div>
      <div class="flex-auto"></div>
      <ClientOnly>
        <ElTag class="mr-2.5" :type="account.has_login ? 'success' : 'info'">
          {{ account.userinfo?.nickname ?? '尚未登陆' }}
        </ElTag>
        <ElButton v-if="account.has_login" @click="account.logout()">
          退出登录
        </ElButton>
      </ClientOnly>
      <DarkControl />
    </ElHeader>
    <ElMain class="!flex flex-row w-full h-[calc(100%-60px)]">
      <ElMenu
        class="el-menu-vertical"
        :collapse="is_menu_collapse"
        unique-opened
        router
      >
        <ElMenuItem :index="route.fullPath" @click="toggle_menu_collapse()">
          <ElIcon>
            <Expand />
          </ElIcon>
          <template #title>
            <span>{{ is_menu_collapse ? '展开' : '收起' }}</span>
          </template>
        </ElMenuItem>
        <ElSubMenu index="/_admin/account">
          <template #title>
            <ElIcon>
              <User />
            </ElIcon>
            <span>账号管理</span>
          </template>
          <ElMenuItem index="/_admin/account/admin">管理员</ElMenuItem>
          <ElMenuItem index="/_admin/label/tabs" disadbled> 用户 </ElMenuItem>
        </ElSubMenu>
        <ElSubMenu index="/_admin/label">
          <template #title>
            <ElIcon>
              <Discount />
            </ElIcon>
            <span>标签管理</span>
          </template>
          <ElMenuItem index="/_admin/label/tabs" disadbled>
            顶部选项卡
          </ElMenuItem>
          <ElMenuItem index="/_admin/label/follow" disadbled>
            可关注标签
          </ElMenuItem>
        </ElSubMenu>
      </ElMenu>
      <div
        class="flex-auto pl-5 relative h-full flex flex-col transition-[width] duration-200"
        :class="
          is_menu_collapse ? 'w-[calc(100%-64px)]' : 'w-[calc(100%-200px)]'
        "
      >
        <slot />
      </div>
    </ElMain>
  </ElContainer>
</template>

<script lang="ts" setup>
import { Discount, Expand, User } from '@element-plus/icons-vue'
import { useAccount } from 'stores/account'
const account = useAccount()
const route = useRoute()

const icon =
  'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg'

/** 菜单是否折叠 */
const is_menu_collapse = useState('admininistar_menu_collapse', () => false)
const toggle_menu_collapse = useToggle(is_menu_collapse)
</script>

<style lang="postcss" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
