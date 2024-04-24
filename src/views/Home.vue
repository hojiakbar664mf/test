<script setup>
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {useUsers} from "@/stores/users.pinia.js";
import {usePosts} from "@/stores/posts.pinia.js";
import Container from "@/components/Container.vue";

const storeUsers = useUsers();
const storePosts = usePosts();
const {users} = storeToRefs(storeUsers);
const {loading, currentPage, pageSize, totalPages, totalCount, posts} = storeToRefs(storePosts);
const userId = ref("");

const handleUserId = (id) => {
  storePosts.getPosts({
    page: currentPage.value,
    limit: pageSize.value,
    userId: id.target.value
  });
};
const setPageLimit = (limit) => {
  storePosts.getPosts({
    page: currentPage.value,
    limit: limit.target.value
  });
}
const setCurrentPage = (page) => {
  if (currentPage.value !== page) {
    storePosts.setCurrentPage(page);
    storePosts.getPosts({
      page: page,
      limit: pageSize.value
    });
  }
};
const prevPage = () => {
  if (currentPage.value > 1) {
    storePosts.setCurrentPage(currentPage.value - 1);
    storePosts.getPosts({
      page: currentPage.value,
      limit: pageSize.value
    });
  }
};
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    storePosts.setCurrentPage(currentPage.value + 1);
    storePosts.getPosts({
      page: currentPage.value,
      limit: pageSize.value
    });
  }
};
const handleResetFilter = () => {
  userId.value = "";
  currentPage.value = 1;
  pageSize.value = 10;
  storePosts.getPosts({
    page: currentPage.value,
    limit: pageSize.value
  });
};

onMounted(() => {
  storeUsers.getUsers();
  storePosts.getPosts({
    page: currentPage.value,
    limit: pageSize.value
  });
});
</script>

<template>
  <container>
    <div class="filters">
      <h3>Posts</h3>
      <div class="users">
        <label>Users:</label>
        <select v-model="userId" @change="handleUserId">
          <option value="" disabled selected>Filter by user</option>
          <option v-for="user of users" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>
      <div class="page-limit">
        <label>Limit:</label>
        <select v-model="pageSize" @change="setPageLimit">
          <option :value="totalCount">All</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
      <button @click="handleResetFilter">reset</button>
    </div>
    <template v-if="loading">loading...</template>
    <template v-else>
      <div class="row">
        <div class="card" v-for="post of posts">
          <router-link to="/">
            <h3 class="title">{{ post.title }}</h3>
            <p class="body">{{ post.body }}</p>
          </router-link>
        </div>
      </div>
      <div v-if="totalPages > 1" class="pagination">
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
  </container>
</template>

<style scoped>

</style>
