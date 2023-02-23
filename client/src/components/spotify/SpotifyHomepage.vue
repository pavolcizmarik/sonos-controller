<template>
  <div v-if="authorized === false">
    <h3 class="mb-4 text-center text-2xl text-slate-300">Authorize Spotify</h3>
    <p class="text-center text-slate-300">
      Play your saved tracks, albums, playlists, etc. from Spotify
    </p>
    <p class="mb-8 text-center text-slate-500">* Spotify Premium is required for playback</p>
    <div class="text-center">
      <button class="rounded-full bg-green-600 py-4 px-8 text-white" @click="authorize">
        Connect Spotify Account
      </button>
    </div>
  </div>
  <div v-else-if="authorized">
    <tab-navigation :tabs="tabs" />
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import appStore from "@/store";

import SpotifyAPI from "@/services/API/spotify";

import TabNavigation from "../TabNavigation.vue";
import "@/helpers/Object";

const route = useRoute();
const router = useRouter();
const authorized = ref(false);

const tabs = [
  { title: "Discovery", link: "/spotify/discovery" },
  { title: "Playlists", link: "/spotify/playlists" },
];

if (route.query.code) {
  try {
    const response = await SpotifyAPI.authorize(route.query.code);

    appStore.global.settings.spotify.refreshToken = await response.data.refreshToken;

    localStorage.setItem("settings", JSON.stringify(appStore.global.settings));

    authorized.value = true;

    router.push({ name: "SpotifyPlaylists" });
  } catch (error) {
    authorized.value = false;
  }
} else {
  try {
    await SpotifyAPI.checkAuthorization(appStore.global.settings.spotify.refreshToken.value);
    authorized.value = true;

    if (route.name === "Spotify") {
      router.push({ name: "SpotifyPlaylists" });
    }
  } catch (error) {
    authorized.value = false;
  }
}

async function authorize() {
  try {
    const response = await SpotifyAPI.getAuthURL();
    window.location = await response.data.authURL;
  } catch (err: any) {
    // console.warn(err);
  }
}
</script>
