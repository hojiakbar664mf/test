<script setup>
import {defineProps} from "vue";
import {usePosts} from "@/stores/posts.pinia.js";

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  totalPages: {
    type: Number,
    default: 1
  }
});
const storePosts = usePosts();

const setCurrentPage = (page) => {
  if (props.currentPage !== page) {
    storePosts.setCurrentPage(page);
    storePosts.getPosts({
      page: page,
      limit: props.pageSize
    });
  }
};
const prevPage = () => {
  if (props.currentPage > 1) {
    storePosts.setCurrentPage(props.currentPage - 1);
    storePosts.getPosts({
      page: props.currentPage,
      limit: props.pageSize
    });
  }
};
const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    storePosts.setCurrentPage(props.currentPage + 1);
    storePosts.getPosts({
      page: props.currentPage,
      limit: props.pageSize
    });
  }
};
</script>

<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <span
        v-for="page of totalPages"
        :class="{'active': currentPage === page}"
        @click="setCurrentPage(page)"
    >
        {{ page }}
      </span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>