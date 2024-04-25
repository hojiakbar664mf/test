import {defineStore} from "pinia";
import {api} from "@/stores/api/index.js";

export const usePosts = defineStore('posts', {
  state: () => ({
    loading: false,
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    posts: [],
    comments: [],
    post_detail: null,
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
    },
    getPostById(id) {
      this.loading = true;
      api({
        url: `posts/${id}`,
        method: 'get',
      }).then(({data}) => {
        this.post_detail = data;
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.loading = false;
      })
    },
    getCommentsByPostId(id) {
      this.loading = true;
      api({
        url: `posts/${id}/comments`,
        method: 'get',
      }).then(({data}) => {
        this.comments = data;
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.loading = false;
      })
    },
    createPost(data) {
      api({
        url: 'posts',
        method: 'post',
        data: data
      }).then(({data}) => {
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {})
    },
    updatePost(data) {
      api({
        url: `posts/${data.id}`,
        method: 'put',
        data: data
      }).then(({data}) => {
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {})
    },
    deletePost(id) {
      api({
        url: `posts/${id}`,
        method: 'delete',
      }).then(({data}) => {
        console.log(data)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {})
    },
  }
});
