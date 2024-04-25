<template>
  <div class="main">
    <router-view v-slot="{Component}">
      <keep-alive :include="['PostsView']">
        <component :is="Component" :key="$route.fullPath"/>
      </keep-alive>
    </router-view>
  </div>
</template>
