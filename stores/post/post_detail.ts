import { defineStore } from 'pinia'
export const usePostStore = defineStore('post_detail', () => {
  const post_id = ref(0)
  const author_id = ref(0)
  function setPostId(postId: number, authorId: number) {
    post_id.value = postId
    author_id.value = authorId
  }

  return { post_id, author_id, setPostId }
})
