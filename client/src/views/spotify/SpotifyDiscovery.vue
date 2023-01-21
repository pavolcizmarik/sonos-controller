<template>
  <h2 class="my-4 text-center text-xl uppercase text-slate-300">{{ albums.message }}</h2>
  <load-library-on-scroll
    :async-load-method="loadMethod"
    :library-item="albums"
    :search-term="searchTerm"
    @loading-error="loadingError"
    @loaded-items="loadedItems"
  >
  </load-library-on-scroll>

  <library-item-count
    :total="albums.total ? albums.total : 0"
    label="Playlists"
  ></library-item-count>

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
import { ref, computed } from "vue";

import { IDiscoveryAlbums } from "@/types/IStore";

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

const albums = ref<IDiscoveryAlbums>({});
const loading = ref(true);
const error = ref(false);
const errorMessage = ref("");

const items = computed(() => albums.value.items || []);
const searchTerm = computed(() => (props.search ? $route.params.pathMatch : null));
const loadMethod = computed(() => SpotifyAPI.getDiscoveryAlbums);

const loadedItems = function (data: any) {
  loading.value = false;
  albums.value = deepmerge(albums, data);
};

const loadingError = function (error) {
  loading.value = false;
  error.value = true;
  errorMessage.value = `${error.response.status}: ${error.response.data}`;
};
</script>
