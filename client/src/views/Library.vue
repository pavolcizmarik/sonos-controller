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
  { title: "Artists", link: "/library/artists" },
  { title: "Albums", link: "/library/albums" },
  { title: "Songs", link: "/library/songs" },
  { title: "Genres", link: "/library/genres" },
  { title: "Playlists", link: "/library/playlists" },
  { title: "Shares", link: "/library/share" },
];
</script>

<style lang="scss">
.router-link-active {
  color: #3b82f6;
  border-color: #3b82f6;
}
</style>
