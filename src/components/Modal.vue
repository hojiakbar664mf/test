<script setup>
import {defineProps, defineEmits, ref, watch} from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '500'
  }
});
const emit = defineEmits(['visible']);
const open = ref(props.visible);
const hideModal = () => {
  open.value = false;
  emit('visible', false);
};
watch(() => props.visible, (newValue) => {
  open.value = newValue;
});
</script>

<template>
  <div class="modal" :style="{'display': open ? 'block' : 'none'}">
    <div class="modal-root" @click="hideModal"></div>
    <div class="modal-content" :style="{'width': width + 'px'}">
      <div class="modal-header">
        <div class="title">{{ title }}</div>
        <div class="close" @click="hideModal">&times;</div>
      </div>
      <div class="modal-body">
        <slot/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 1000;
  height: 100%;
  inset-inline-end: 0;
  inset-inline-start: 0;
  background-color: rgba(0, 0, 0, 0.45);
  .modal-root {
    position: fixed;
    top: 0;
    bottom: 0;
    inset-inline-end: 0;
    inset-inline-start: 0;
    overflow: auto;
    outline: 0;
  }
  .modal-content {
    position: relative;
    top: 100px;
    z-index: 999;
    padding: 20px;
    margin: 0 auto;
    border-radius: 8px;
    background: #FFFFFF;
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 10px;
      .title {
        font-size: 24px;
        font-weight: 600;
      }
      .close {
        font-size: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>
