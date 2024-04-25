<script setup>
import {ref, reactive} from "vue";
import {storeToRefs} from "pinia";
import {useUsers} from "@/stores/users.pinia.js";
import {usePosts} from "@/stores/posts.pinia.js";
import Modal from "@/components/Modal.vue";

const storeUsers = useUsers();
const storePosts = usePosts();
const {users} = storeToRefs(storeUsers);
const formState = reactive({
  title: null,
  body: null,
  userId: null,
});
const visible = ref(false);

const showModal = () => {
  visible.value = true;
};
const hideModal = (v) => {
  visible.value = v;
};
const onSubmit = () => {
  storePosts.createPost(formState);
  visible.value = false;
};
</script>

<template>
  <button class="btn" @click="showModal">Create post</button>

  <modal
      :visible="visible"
      title="Create post"
      @visible="hideModal"
  >
    <form class="form">
      <div class="form-item">
        <label>Title:</label>
        <input type="text" v-model="formState.title">
      </div>
      <div class="form-item">
        <label>Body:</label>
        <textarea v-model="formState.body"/>
      </div>
      <div class="form-item">
        <label>Users:</label>
        <select v-model="formState.userId">
          <option v-for="user of users" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>
      <button class="btn" type="button" @click="onSubmit">Submit</button>
    </form>
  </modal>
</template>

<style scoped lang="scss">

</style>
