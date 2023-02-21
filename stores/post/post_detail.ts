import { defineStore } from 'pinia'
export const usePostStore = defineStore('post_detail', () => {
  const post_id = ref(0)
  function setPostId(id: number) {
    console.log('id', id)
    post_id.value = id
  }

  return { post_id, setPostId }
})
