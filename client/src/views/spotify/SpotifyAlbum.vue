<template>
  <div>
    <load-library-on-scroll
      :async-load-method="getItems"
      :library-item="album"
      :detail-path="path"
      @loading-error="loadingError"
      @loaded-items="loadedItems"
    >
    </load-library-on-scroll>

    <song-list :songs="songs" :album-mode="!props.isPlaylist" :is-spotify="true"></song-list>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";

import SpotifyAPI from "@/services/API/spotify";
import deepmerge from "deepmerge";

import SongList from "@/components/SongList.vue";
import LoadLibraryOnScroll from "@/components/library/LoadLibraryOnScroll.vue";
import { IAlbum } from "@/types/IStore";

onBeforeRouteUpdate((to, from, next) => {
  path.value = to.path;
  pathMatch.value = to.params.pathMatch;
  album.value = {};
  next();
});

const route = useRoute();

const props = defineProps({
  isPlaylist: {
    type: Boolean,
    default: false,
  },
});

const album = ref<IAlbum>({});
const albumName = ref<string>("");
const path = ref<string>("");
const loading = ref<boolean>(true);
const error = ref<boolean>(false);
const errorMessage = ref<string>("");
const pathMatch = ref<string | string[]>([]);

const songs = computed(() => album.value.items || []);

function updateAlbumDetails() {
  albumName.value = album.value.name || "";
}

const getItems = SpotifyAPI.get;

function loadedItems(data: any) {
  loading.value = false;
  album.value = deepmerge(album.value, data);
  updateAlbumDetails();
}

function loadingError(err: any) {
  loading.value = false;
  error.value = true;
  errorMessage.value = `${err?.response?.status}: ${err?.response?.data}`;
}

watch(route, (to) => {
  path.value = to.path;
  pathMatch.value = to.params.pathMatch;
  album.value = {};
  updateAlbumDetails();
});

path.value = route.path;
pathMatch.value = route.params.pathMatch;
</script>
