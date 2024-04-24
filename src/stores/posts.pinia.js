import {defineStore} from "pinia";
import {api} from "@/stores/api/index.js";

export const usePosts = defineStore('posts', {
  state: () => ({
    loading: false,
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    posts: [],
  }),
  actions: {
    setCurrentPage(page) {
      this.currentPage = page;
    },
    getPosts(payload = {page: 1, limit: 10, userId: ""}) {
      this.loading = true;
      api({
        url: `posts?_page=${payload.page}&_limit=${payload.limit}${payload.userId ? '&userId=' + payload.userId : ''}`,
        method: 'get'
      }).then(({data, headers}) => {
        const totalCount = headers.get('x-total-count');
        this.totalPages = Math.ceil(totalCount / payload.limit);
        this.posts = data;
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.loading = false;
      })
    }
  }
});
