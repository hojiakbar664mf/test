<script setup>
import {ref, reactive, defineProps} from "vue";
import {storeToRefs} from "pinia";
import {useUsers} from "@/stores/users.pinia.js";
import {usePosts} from "@/stores/posts.pinia.js";
import Modal from "@/components/Modal.vue";

const props = defineProps({
  post: Object,
});
const storeUsers = useUsers();
const storePosts = usePosts();
const {users} = storeToRefs(storeUsers);
const formState = reactive({
  id: null,
});
const visible = ref(false);

const showModal = () => {
  visible.value = true;
  Object.assign(formState, {
    id: props.post.id,
  });
};
const hideModal = (v) => {
  visible.value = v;
};
const onSubmit = () => {
  storePosts.deletePost(formState.id);
  visible.value = false;
};
</script>

<template>
  <button class="btn btn-delete" @click="showModal">Delete</button>

  <modal
      :visible="visible"
      title="Delete post"
      width="400"
      @visible="hideModal"
  >
    <form class="form">
      <p>Are you sure delete this post?</p>
      <div class="btn-group">
        <button type="button" class="btn" @click="visible = false">No</button>
        <button type="button" class="btn" @click="onSubmit">Yes</button>
      </div>
    </form>
  </modal>
</template>

<style scoped lang="scss">

</style>
