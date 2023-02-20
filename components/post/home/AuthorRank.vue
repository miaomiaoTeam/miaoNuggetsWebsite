<template>
  <el-card
    v-if="authorList"
    class="box-card w-[240px] mb-[16px]"
    shadow="never"
    body-style="padding: 0px; background-color: white; "
  >
    <template #header>
      <div class="text-[14px]">🎖️ 作者榜</div>
    </template>

    <div v-for="author in authorList" :key="author.id">
      <div class="author-item py-3 px-4">
        <img
          class="author-avatar"
          :src="'https://p3-passport.byteimg.com/img/user-avatar/b9a366997037d998063135bd56302b85~100x100.awebp'"
          alt="Author Avatar"
        />
        <div class="author-info">
          <div class="author-name">
            {{ author.username }}
            <el-tag>Lv 0</el-tag>
          </div>
          <div class="ellipsis">{{ author.introduce }}</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
// const itemList = await $fetch('/api/author/rank')
// const itemList = ref([])
// watchEffect(async () => {
//   const { data } = await useLazyFetch('http://localhost:3000/api/author/rank')
//   console.log('data.value.data', data.value.data)
//   itemList.value = data.value.data
// })
// const url = '../assets/mfer.png'
// const { data } = useAsyncData(
//   'TabsLabelList',
//   () =>
//     $fetch('/api/author/rank', {
//       query: { cursor: 0, limit: 5 },
//     })
//   console.log('data',data)
// )
interface postAuthorType {
  id: number
  username: string
  introduce: number
}
const authorList = ref<postAuthorType[]>([])
const { data } = await useFetch<any>(
  'http://127.0.0.1:4523/m1/2295980-0-default/api/author/rank'
)
authorList.value = data.value?.data
// onMounted(() => {
//   watch(data, vals => {
//     if (vals) itemList.value = vals.data
//   })
//   watchEffect(() => console.log(itemList))
// })
// const itemList = ref([
//   {
//     user_id: '1',
//     avatar: '#assets/ad.webp',
//     user_name: '小方',
//     description: 'sssss',
//   },
// ])
</script>

<style scoped>
.author-block-title {
  padding: 0px;
  font-size: 14px;
  border-bottom: 1px solid #eee;
}
.author-item {
  display: flex;
  cursor: pointer;
}
.author-avatar {
  flex: 0 0 auto;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin-right: 10px;
}
.author-info {
  flex: 1 1 auto;
  font-size: 12px;
  color: #909090;
  line-height: 1.5;
  overflow: hidden;
}
.author-name {
  font-size: 15px;
  color: #262626;
}
:deep(.el-card__header) {
  padding: 12px 15.6px;
}
</style>
