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
        <ElSubMenu
          v-for="top_menu of admin_menu"
          :key="top_menu.route"
          :index="'/_admin/' + top_menu.route"
        >
          <template #title>
            <ElIcon>
              <component :is="top_menu.icon" />
            </ElIcon>
            <span>{{ top_menu.label }}</span>
          </template>
          <ElMenuItem
            v-for="child_menu of top_menu.children"
            :key="child_menu.route"
            :index="`/_admin/${top_menu.route}/${child_menu.route}`"
          >
            {{ child_menu.label }}
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

const admin_menu = [
  {
    label: '账号管理',
    route: 'account',
    icon: User,
    children: [
      { label: '管理员', route: 'admin' },
      { label: '用户', route: 'user' },
    ],
  },
  {
    label: '标签管理',
    route: 'label',
    icon: Discount,
    children: [
      { label: '顶部选项卡', route: 'tabs' },
      { label: '可关注标签', route: 'follow' },
    ],
  },
]
</script>

<style lang="postcss" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
