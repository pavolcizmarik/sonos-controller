<template>
  <section>
    <h1 class="my-8 text-center text-4xl uppercase text-slate-300">{{ props.title }}</h1>

    <div
      class="border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400"
    ></div>

    <router-view></router-view>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import MusicLibraryAPI from "@/services/API/musicLibrary";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

const route = useRoute();

let topResults: ITopResults = {};
let loading = true;
let error = false;
let errorMessage = null;
let searchTerm: any = "";

searchTerm = route.params.catchAll;

async function getTopSearchResults() {
  try {
    loading = true;
    error = false;
    const result = await MusicLibraryAPI.searchTopResults({
      searchTerm: searchTerm,
      start: 0,
      total: 100,
    });
    // Because the user may trigger quite a few different searches by typing
    // make sure we settle on the data that matches the current searchTerm input
    if (result.data.searchTerm === searchTerm) {
      topResults = result.data;
    }
    loading = false;
  } catch (err: any) {
    loading = false;
    error = true;
    errorMessage = `${err.response.status}: ${err.response.data}`;
  }
}

interface ITopResults {
  tracks?: any;
  albumArtists?: any;
  albums?: any;
  playlists?: any;
  sonos_playlists?: any;
  genres?: any;
}

const songs = computed(() => (topResults.tracks ? topResults.tracks.items : null));
const artists = computed(() => (topResults.albumArtists ? topResults.albumArtists.items : null));
const albums = computed(() => (topResults.albums ? topResults.albums.items : null));
const playlists = computed(() => (topResults.playlists ? topResults.playlists.items : null));
const sonosPlaylists = computed(() =>
  topResults.sonos_playlists ? topResults.sonos_playlists.items : null
);
const genres = computed(() => (topResults.genres ? topResults.genres.items : null));

getTopSearchResults();
</script>
