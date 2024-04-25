<script setup>
import {onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {usePosts} from "@/stores/posts.pinia.js";
import Container from "@/components/Container.vue";
import UpdatePost from "@/views/posts/components/UpdatePost.vue";
import DeletePost from "@/views/posts/components/DeletePost.vue";

const route = useRoute();
const router = useRouter();
const storePosts = usePosts();
const {loading, post_detail, comments} = storeToRefs(storePosts);

onMounted(() => {
  storePosts.getPostById(route.params.id);
  storePosts.getCommentsByPostId(route.params.id);
});
</script>

<template>
  <container>
    <div class="btn-group">
      <button class="btn" @click="router.go(-1)">Back</button>
      <template v-if="post_detail">
        <update-post :post="post_detail"/>
        <delete-post :post="post_detail"/>
      </template>
    </div>
    <template v-if="loading">loading...</template>
    <template v-else>
      <template v-if="post_detail">
        <div class="post-detail">
          <p>Title: {{ post_detail.title }}</p>
          <p>Body: {{ post_detail.body }}</p>
          <ul class="comments">
            <li v-for="data of comments">
              <p>User email: {{ data.email }}</p>
              <p>
                Comment: <br>
                {{ data.name }} <br>
                {{ data.body }}
              </p>
            </li>
          </ul>
        </div>
      </template>
      <template v-else>Empty data</template>
    </template>
  </container>
</template>

<style scoped lang="scss">

</style>
