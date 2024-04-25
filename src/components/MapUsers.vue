<script setup>
import {defineProps} from 'vue';
import {GoogleMap, InfoWindow} from 'vue3-google-map';

const props = defineProps({
  users: Array,
});
const center = {lat: -25.363, lng: 131.044};
</script>

<template>
  <GoogleMap
      api-key="YOUR_GOOGLE_MAPS_API_KEY"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="2"
  >
    <InfoWindow
        v-for="user of users"
        :options="{
          position: {lat: parseFloat(user.address.geo.lat), lng: parseFloat(user.address.geo.lng)},
          content: user.name
        }"
    />
  </GoogleMap>
</template>

<style scoped lang="scss">

</style>
