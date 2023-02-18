<template>
  <el-card v-if="data" class="w-[240px] mb-[16px]" shadow="never">
    <template #header>
      <div class="author-rank">🎖️ 作者榜</div>
    </template>

    <div v-for="{ author_id, author_info } in data.data" :key="author_id">
      <div class="author-item">
        <img
          class="author-avatar"
          :src="'https://p3-passport.byteimg.com/img/user-avatar/b9a366997037d998063135bd56302b85~100x100.awebp'"
          alt="Author Avatar"
        />
        <div class="author-info">
          <div class="author-name">
            {{ author_info.nickname }}
            <el-tag>Lv 0</el-tag>
          </div>
          <div class="ellipsis">{{ author_info.introduce }}</div>
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

const { data } = useAsyncData(
  'TabsLabelList',
  () =>
    $fetch('/api/author/rank', {
      query: { cursor: 0, limit: 5 },
    })
  // console.log('data',data)
)

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
.author-rank {
  height: 14px;
  font-size: 14px;
  margin-top: -8px;
}
.author-block-title {
  padding: 0px;
  font-size: 14px;
  border-bottom: 1px solid #eee;
}

.author-item {
  display: flex;
  padding: 0px;
  cursor: pointer;
  margin-top: -8px;
  height: 40px;
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
</style>
