<script setup>
import {defineProps} from 'vue';
import {GoogleMap, Marker} from 'vue3-google-map';

const props = defineProps({
  users: Array,
});
const center = { lat: 40.689247, lng: -74.044502 }
</script>

<template>
  <GoogleMap
      api-key="AIzaSyA6QbfUda-dryXqNQyoH8vrpJfnqMUZuFA"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<style scoped lang="scss">

</style>
