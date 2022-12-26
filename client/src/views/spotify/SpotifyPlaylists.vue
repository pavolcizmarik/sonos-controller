<template>
  <load-library-on-scroll
    :async-load-method="loadMethod"
    :library-item="spotifyPlaylists"
    :search-term="searchTerm"
    @loading-error="loadingError"
    @loaded-items="loadedItems"
  >
  </load-library-on-scroll>

  <library-item-count :total="spotifyPlaylists.total" label="Playlists"></library-item-count>

  <div class="flex flex-wrap justify-center gap-8">
    <library-item
      v-for="item in items"
      :key="item.uri"
      :item="item"
      to-prefix="/spotify/playlist"
      :is-spotify="true"
    ></library-item>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { IPlaylist } from "@/types/IStore";
import deepmerge from "deepmerge";
import SpotifyAPI from "@/services/API/spotify";
import LibraryItem from "@/components/library/LibraryItem.vue";
import LibraryItemCount from "@/components/library/LibraryItemCount.vue";
import LoadLibraryOnScroll from "@/components/library/LoadLibraryOnScroll.vue";

const props = defineProps({
  search: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();

const spotifyPlaylists = ref<IPlaylist>({});
const loading = ref<boolean>(true);
const error = ref<boolean>(false);
const errorMessage = ref<string>("");

const items = computed(() => {
  return spotifyPlaylists.value.items;
});

const searchTerm = computed(() => {
  if (props.search) {
    return route.params.pathMatch.toString();
  }
  return "";
});

const loadMethod = computed(() => {
  return SpotifyAPI.getUserPlaylists;
});

function loadedItems(data: IPlaylist) {
  loading.value = false;
  spotifyPlaylists.value = deepmerge(spotifyPlaylists.value, data);
}

function loadingError(err: any) {
  loading.value = false;
  error.value = true;
  errorMessage.value = `${err.response.status}: ${err.response.data}`;
}
</script>
