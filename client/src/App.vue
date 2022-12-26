<template>
  <div class="h-full antialiased">
    <Header />
    <RouterView class="pt-16 pb-36" :title="route.name" />
    <PlayerBar />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

import Header from "@/components/Header.vue";
import PlayerBar from "@/components/PlayerBar.vue";

import { registerStore } from "@/store";

const route = useRoute();

registerStore();
</script>

<style>
html,
body,
#app {
  height: 100%;
  font-family: "Varela Round", sans-serif;
}
</style>
