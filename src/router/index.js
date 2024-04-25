import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: '/',
    name: 'PostsView',
    component: () => import('@/views/posts/PostsView.vue'),
  },
  {
    path: '/post/:id',
    name: 'PostDetailView',
    component: () => import('@/views/posts/PostDetailView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0)
  }
});

export default router;
