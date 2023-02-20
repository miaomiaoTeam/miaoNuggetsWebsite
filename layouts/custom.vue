<template>
  <div class="h-16">
    <header
      class="transition-all ml-4 mr-4 tabSm:ml-8 tabLg:ml-16 h-16 flex items-center"
    >
      <NuxtLink
        href=""
        class="tabSm:flex tabSm:items-center tabSm:mr-2 tabSm:flex-none"
      >
        <img src="/favicons/favicon-32x32.png" alt="" />
        <p class="hidden tabSm:flex ml-2 w-20 text-xl">稀土掘金</p>
      </NuxtLink>

      <div
        class="relative flex items-center tabLg:hidden tabLg: mx-4 cursor-pointer"
        @click="showMeanList"
      >
        <div href="" class="text-blue-500">首页</div>
        <img
          src="/svg/sanjiao.svg"
          alt=""
          class="w-5 h-5 icon"
          :class="{ active: mean_show == true }"
        />

        <div
          v-show="mean_show"
          class="flex flex-col items-center w-40 absolute border rounded top-8 -left-16 shadow-sm"
        >
          <ul>
            <li v-for="item in tabList" :key="item.id" class="selectLi">
              <p>{{ item.label }}</p>
              <span
                v-if="item.badge != ''"
                class="absolute scale-50 top-2 left-0 w-16 bg-red-500 rounded-full text-white text-center"
              >
                {{ item.badge }}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <ul class="hidden tabLg:flex items-center h-16">
        <!-- 先暂时这么写 后面api进行配置 -->

        <li
          v-for="item in tabList"
          :key="item.id"
          class="relative h-full flex items-center liBox"
        >
          <span
            v-if="item.badge != ''"
            class="absolute scale-50 top-2 left-6 w-16 bg-red-500 rounded-full text-white text-center"
          >
            {{ item.badge }}
          </span>
          <NuxtLink
            href=""
            class="h-full flex items-center invisible tabLg: tabLi box-border"
          >
            {{ item.label }}
          </NuxtLink>
          <!-- </el-badge> -->
        </li>
      </ul>
    </header>
    <slot />
  </div>
</template>
<script setup lang="ts">
//   $fetch('/api/label/tabs/list', {
//     method: 'GET',
//     baseURL: 'http://localhost',
//   }).then(res => {
//     tabList.value = res.data
//     console.log(res)
//   })

// 这里要改一下

const tabList = ref([
  {
    label: '首页',
    route: '',
    link: '',
    badge: '邀请有礼',
    show: true,
    menu: true,
    id: 0,
  },
  {
    label: '首页',
    route: '',
    link: '',
    badge: '邀请有礼',
    show: true,
    menu: true,
    id: 0,
  },
  {
    label: '首页',
    route: '',
    link: '',
    badge: '邀请有礼',
    show: true,
    menu: true,
    id: 0,
  },
])
const mean_show = ref<boolean>(false)
const showMeanList = () => {
  mean_show.value = !mean_show.value
  console.log('mean_show', mean_show.value)
}
</script>
<style scoped>
/* .tabSmall{
      @apply invisible
  }
  .laptop{
      @apply  mx-4 visible 
  } */

.tabLi {
  @apply mx-4 visible text-sm;
}

.selectLi {
  @apply relative flex items-center h-16 text-sm;
}

/* .selectBox{
      background: pink;
      width: 10rem;
     
      padding: 0.667rem;
  } */
/* 以下的代码为了简便我暂时这样写了 */
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

.tabLi:hover {
  border-bottom: 2px solid #1e80ff;
}
</style>
