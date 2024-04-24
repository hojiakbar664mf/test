import {defineStore} from "pinia";
import {api} from "@/stores/api/index.js";

export const usePosts = defineStore('posts', {
  state: () => ({
    posts: [],
  }),
  actions: {
    getPosts(payload = {}) {
      api({
        url: 'posts',
        method: 'get'
      }).then(({data}) => {
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {})
    }
  }
});
