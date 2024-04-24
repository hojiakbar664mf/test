<script setup>
import {onMounted} from "vue";
import {storeToRefs} from "pinia";
import {usePosts} from "@/stores/posts.pinia.js";

const storePosts = usePosts();
const {posts} = storeToRefs(storePosts);

onMounted(() => {
  storePosts.getPosts();
});
</script>

<template>
  home
</template>

<style scoped>

</style>
