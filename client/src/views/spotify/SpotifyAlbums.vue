<template>
  <v-layout>
    <load-library-on-scroll
      :async-load-method="loadMethod"
      :library-item="albums"
      :search-term="searchTerm"
      @loading-error="loadingError"
      @loaded-items="loadedItems"
    >
    </load-library-on-scroll>
    <ErrorView v-if="error" absolute :message="errorMessage"></ErrorView>
    <LoadingView v-else-if="loading" absolute message="Loading..."></LoadingView>
    <v-layout v-else row wrap>
      <library-item-count :total="albums.total" label="Albums"></library-item-count>
      <library-item
        v-for="(item, index) in items"
        :key="`${item.uri}#${index}`"
        :item="item"
        to-prefix="/spotify/album"
        :is-spotify="true"
      ></library-item>
    </v-layout>
  </v-layout>
</template>

<script>
import deepmerge from "deepmerge";
import SpotifyAPI from "@/services/API/services/spotify";
import LibraryItem from "@/components/LibraryItem.vue";
import LibraryItemCount from "@/components/library/LibraryItemCount.vue";
import LoadLibraryOnScroll from "@/components/library/LoadLibraryOnScroll.vue";
export default {
  name: "SpotifyAlbums",
  components: { LibraryItem, LibraryItemCount, LoadLibraryOnScroll },
  props: {
    search: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    albums: {},
    loading: true,
    error: false,
    errorMessage: null,
  }),
  computed: {
    items() {
      return this.albums.items || [];
    },
    searchTerm() {
      if (this.search) {
        return this.$route.params.pathMatch;
      }
      return null;
    },
    loadMethod() {
      return SpotifyAPI.getUserAlbums;
    },
  },
  methods: {
    loadedItems(data) {
      this.loading = false;
      this.albums = deepmerge(this.albums, data);
    },
    loadingError(error) {
      this.loading = false;
      this.error = true;
      this.errorMessage = `${error.response.status}: ${error.response.data}`;
    },
  },
};
</script>
