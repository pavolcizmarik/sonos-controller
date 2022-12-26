<template>
  <ul class="mr-8 flex">
    <li v-for="(route, i) in routes" :key="i">
      <router-link class="mr-6 text-slate-300 hover:text-blue-500" :to="route.path">{{
        route.name
      }}</router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
const routes = [
  {
    path: "/",
    name: "Now Playing",
  },
  {
    path: "/search",
    name: "Search",
  },
  {
    path: "/rooms",
    name: "Rooms",
  },
  {
    path: "/library",
    name: "Library",
  },
  {
    path: "/sonos",
    name: "Sonos",
  },
  {
    path: "/spotify",
    name: "Spotify",
  },
];
</script>
