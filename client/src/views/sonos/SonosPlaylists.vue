<template>
  <div>
    <load-library-on-scroll
      :async-load-method="loadMethod"
      :library-item="sonosPlaylists"
      :search-term="searchTerm"
      @loading-error="loadingError"
      @loaded-items="loadedItems"
    >
    </load-library-on-scroll>
    <ErrorView v-if="error" absolute :message="errorMessage"></ErrorView>
    <LoadingView v-else-if="loading" absolute message="Loading..."></LoadingView>
    <div v-else row wrap>
      <library-item-count :total="sonosPlaylists.total" label="Playlists"></library-item-count>
      <library-item
        v-for="item in items"
        :key="item.uri"
        :item="item"
        to-prefix="/sp"
      ></library-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import deepmerge from "deepmerge";
import MusicLibraryAPI from "@/services/API/musicLibrary";

import LibraryItem from "@/components/library/LibraryItem.vue";
import LibraryItemCount from "@/components/library/LibraryItemCount.vue";
import LoadLibraryOnScroll from "@/components/library/LoadLibraryOnScroll.vue";

const route = useRoute();

const props = defineProps({
  search: {
    type: Boolean,
    default: false,
  },
});

const sonosPlaylists = ref<any>({});
const loading = ref(true);
const error = ref(false);
const errorMessage = ref("");

const items = computed(() => sonosPlaylists.value.items || []);

const searchTerm = computed(() => {
  if (props.search) {
    return route.params.pathMatch;
  }
  return "";
});

const loadMethod = computed(() =>
  props.search ? MusicLibraryAPI.searchSonosPlaylists : MusicLibraryAPI.getSonosPlaylists
);

const loadedItems = function (data: any) {
  loading.value = false;
  sonosPlaylists.value = deepmerge(sonosPlaylists, data);
};

const loadingError = function (error: any) {
  loading.value = false;
  error.value = true;
  errorMessage.value = `${error.response.status}: ${error.response.data}`;
};
</script>
