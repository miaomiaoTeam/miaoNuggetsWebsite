<template>
  <div class="h-16">
    <header
      class="transition-all ml-4 mr-4 tabSm:ml-8 tabLg:ml-16 h-16 flex items-center borber-b"
    >
      <!-- logo -->
      <NuxtLink
        class="tabSm:flex tabSm:items-center tabSm:mr-2 tabSm:flex-none"
        to="/"
      >
        <img src="/favicons/favicon-32x32.png" alt="" />
        <p class="hidden tabSm:flex ml-2 w-20 text-xl">稀土掘金</p>
      </NuxtLink>
      <!-- 移动端菜单 -->
      <ClientOnly>
        <ElPopover
          v-if="!is_tab_lg"
          v-model:visible="is_mean_show"
          placement="bottom"
          trigger="click"
        >
          <template #reference>
            <div class="flex items-center mx-4 cursor-pointer">
              <span class="text-blue-500">首页</span>
              <img
                src="/svg/sanjiao.svg"
                class="w-5 h-5 icon"
                :class="{ active: is_mean_show == true }"
              />
            </div>
          </template>
          <ul v-if="tab_list" class="menu phone-menu">
            <li class="menu-item">
              <NuxtLink to="/" @click="toggle_mean_show(false)">
                <span
                  class="tab_label"
                  :class="{ active: $route.path === '/' }"
                >
                  首页
                </span>
              </NuxtLink>
            </li>
            <template v-for="tab in tab_list.data" :key="tab.id">
              <component
                :is="tab.link ? 'nav' : 'li'"
                v-if="tab.is_show && tab.in_menu"
                class="menu-item"
              >
                <NuxtLink
                  :to="tab.link ?? tab.route"
                  :target="tab.link ? '_blank' : null"
                >
                  <span
                    class="tab_label"
                    :class="{ active: $route.path.startsWith(tab.route) }"
                  >
                    {{ tab.label }}
                    <span v-if="tab.badge" class="tab_badge">
                      {{ tab.badge }}
                    </span>
                  </span>
                </NuxtLink>
              </component>
            </template>
          </ul>
        </ElPopover>
      </ClientOnly>
      <!-- PC端菜单 -->
      <ul v-if="tab_list" class="hidden tabLg:flex menu">
        <li class="menu-item">
          <NuxtLink to="/" @click="toggle_mean_show(false)">
            <span class="tab_label" :class="{ active: $route.path === '/' }">
              首页
            </span>
          </NuxtLink>
        </li>
        <template v-for="tab in tab_list.data" :key="tab.id">
          <component
            :is="tab.link ? 'nav' : 'li'"
            v-if="tab.is_show"
            class="menu-item"
          >
            <NuxtLink
              :to="tab.link ?? tab.route"
              :target="tab.link ? '_blank' : null"
            >
              <span
                class="tab_label"
                :class="{ active: $route.path.startsWith(tab.route) }"
              >
                {{ tab.label }}
                <span v-if="tab.badge" class="tab_badge">
                  {{ tab.badge }}
                </span>
              </span>
            </NuxtLink>
          </component>
        </template>
      </ul>
    </header>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { useAsyncData } from 'nuxt/app'
const is_tab_lg = useMediaQuery('(min-width: 1190px)')

const { data: tab_list } = useAsyncData(() => $fetch('/api/label/tabs/list'))

const is_mean_show = ref(false)
const toggle_mean_show = useToggle(is_mean_show)
</script>
<style lang="postcss" scoped>
.menu {
  @apply flex items-center;
}

.phone-menu {
  @apply bg-white;
  @apply flex-col;
}
.menu .menu-item {
  @apply relative;
  @apply flex items-center;
  @apply h-16;
  @apply text-sm;
  @apply cursor-pointer;
}
.menu .menu-item a {
  @apply box-content mx-[1rem];
  @apply leading-[4rem];
}
.menu .menu-item a::before {
  content: '';
  @apply absolute left-[1rem] right-[1rem] bottom-0;
  @apply h-[2px];
}
.menu .menu-item a:hover::before {
  background-color: #1e80ff;
}

.tab_label {
  @apply relative;
}
.tab_label.active {
  color: #1e80ff;
}
.menu .menu-item a:hover .tab_label {
  @apply text-black;
}
.tab_label .tab_badge {
  @apply absolute z-10 top-[-20px] left-[10px];
  @apply bg-red-500 px-[7px] py-[2px] rounded-[50px];
  @apply scale-50;
  @apply whitespace-nowrap text-white text-base text-center;
}

.icon {
  fill: #515767;
  transform: rotate(0deg);
  transition: transform 0.2s ease-in-out;
}
.icon.active {
  fill: currentColor;
  color: #1e80ff;
  transform: rotate(-180deg);
}
</style>
