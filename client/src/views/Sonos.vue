<template>
  <section>
    <h1 class="my-8 text-center text-4xl uppercase text-slate-300">{{ props.title }}</h1>

    <tab-navigation :tabs="tabs" />

    <router-view></router-view>
  </section>
</template>

<script setup lang="ts">
import TabNavigation from "@/components/TabNavigation.vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

const tabs = [
  { title: "Playlists", link: "/sonos/playlists" },
  { title: "Favorites", link: "/sonos/favorites" },
];
</script>

<style lang="scss">
.router-link-active {
  color: #3b82f6;
  border-color: #3b82f6;
}
</style>
