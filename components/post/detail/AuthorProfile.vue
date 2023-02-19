<template>
  <el-card v-if="data" class="w-[300px] mb-[20px]" shadow="never">
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
          <div class="author-profile">{{ author_info.introduce }}</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
const { data } = useAsyncData('TabsLabelList', () =>
  $fetch('/api/author/rank', {
    query: { cursor: 0, limit: 5 },
  })
)
</script>

<style scoped>
.author-block-title {
  padding: 0px;
  font-size: 14px;
  border-bottom: 1px solid #eee;
}

.author-item {
  display: flex;
  padding: 0px;
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
  font-weight: bold;
  font-size: 15px;
  color: #262626;
}

.author-profile {
  margin-top: 7px;
  font-size: 14px;
  color: #262626;
}
</style>
