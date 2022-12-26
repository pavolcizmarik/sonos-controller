<template>
  <section>
    <h1 class="my-8 text-center text-4xl uppercase text-slate-300">{{ props.title }}</h1>

    <LoadLibraryOnScroll
      :async-load-method="loadMethod"
      :library-item="albumArtists"
      :search-term="searchTerm"
      @loading-error="loadingError"
      @loaded-items="loadedItems"
    >
    </LoadLibraryOnScroll>

    <ErrorView v-if="error" absolute :message="errorMessage"></ErrorView>
    <LoadingView v-else-if="loading" absolute message="Loading..."></LoadingView>

    <div v-else>
      <LibraryItemCount :total="albumArtists.total" label="Artists"></LibraryItemCount>
      <LibraryItem
        v-for="item in items"
        :key="item.uri"
        :item="item"
        to-prefix="/artist"
      ></LibraryItem>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import { IArtists } from "@/types/IStore";
import MusicLibraryAPI from "@/services/API/musicLibrary";
import LibraryItem from "@/components/library/LibraryItem.vue";
import LibraryItemCount from "@/components/library/LibraryItemCount.vue";
import LoadLibraryOnScroll from "@/components/library/LoadLibraryOnScroll.vue";

import deepmerge from "deepmerge";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  search: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();

let albumArtists: IArtists = {};
let loading = true;
let error = false;
let errorMessage = "";

function loadedItems(data: object) {
  loading = false;
  albumArtists = deepmerge(albumArtists, data);
}

function loadingError(err: any) {
  loading = false;
  error = true;
  errorMessage = `${err.response.status}: ${err.response.data}`;
}

const items = computed(() => {
  return albumArtists.items;
});

const searchTerm = computed(() => {
  if (props.search) {
    return route.params.pathMatch;
  }
  return null;
});

const loadMethod = computed(() => {
  return props.search ? MusicLibraryAPI.searchAlbumArtists : MusicLibraryAPI.getAlbumArtists;
});
</script>
