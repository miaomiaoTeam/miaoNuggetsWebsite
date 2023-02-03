<template>
  <div class="h-16">
    <header
      class="transition-all ml-4 mr-4 tabSm:ml-8 tabLg:ml-16 h-16 flex items-center"
    >
      <a
        href=""
        class="tabSm:flex tabSm:items-center tabSm:mr-2 tabSm:flex-none"
      >
        <img src="../public/favicons/favicon-32x32.png" alt="" />
        <p class="hidden tabSm:flex ml-2 w-20 text-xl">稀土掘金</p>
      </a>
      <nav>
        <div
          class="relative flex items-center tabLg:hidden tabLg: mx-4 cursor-pointer"
          @click="show"
        >
          <div href="" class="text-blue-500">首页</div>
          <img
            src="../public/svg/sanjiao.svg"
            alt=""
            class="w-5 h-5 icon"
            :class="{ active: isShow == true }"
          />

          <div
            v-show="isShow"
            class="flex flex-col items-center w-40 absolute border rounded top-8 -left-16 shadow-sm"
          >
            <ul>
              <li v-for="item in tabList" :key="item.id" class="selectLi">
                <p>{{ item.name }}</p>
                <span
                  v-if="item.isTabel == true"
                  class="absolute scale-50 top-2 left-0 w-16 bg-red-500 rounded-full text-white text-center"
                >
                  {{ item.tabelName }}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <ul class="hidden tabLg:flex tabLg:items-center tabLg:h-16">
          <!-- 先暂时这么写 后面api进行配置 -->

          <li
            v-for="item in tabList"
            :key="item.id"
            class="relative h-full flex items-center liBox"
          >
            <!-- <el-badge
              v-if="item.isTabel == true"
              :value="item.tabelName"
              class="absolute"
            > -->
            <span
              v-if="item.isTabel == true"
              class="absolute scale-50 top-2 left-6 w-16 bg-red-500 rounded-full text-white text-center"
            >
              {{ item.tabelName }}
            </span>
            <a
              href=""
              class="h-full flex items-center invisible tabLg: tabLi box-border"
            >
              {{ item.name }}
            </a>
            <!-- </el-badge> -->
          </li>
        </ul>
      </nav>
    </header>
    <slot />
  </div>
</template>
<script setup lang="ts">
const tabList = [
  {
    id: 0,
    name: '首页',
    isTabel: true,
    tabelName: '邀请有礼',
  },
  {
    name: '首页',
    isTabel: true,
    tabelName: '邀请有礼',
  },
  {
    name: '首页',
    isTabel: true,
    tabelName: '邀请有礼',
  },
]
const isShow = ref<boolean>(false)
const show = () => {
  isShow.value = !isShow.value
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
