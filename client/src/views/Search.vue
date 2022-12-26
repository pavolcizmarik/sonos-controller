<template>
  <section>
    <h1 class="my-8 text-center text-4xl uppercase text-slate-300">
      {{ props.title }}
    </h1>

    <div class="m-auto w-80">
      <input
        v-model="searchInput"
        type="text"
        class="w-full rounded-md"
        placeholder="Start typing..."
      />
    </div>

    <error-view v-if="error" absolute :message="errorMessage"></error-view>
    <loading-view v-else-if="loading" absolute message="Loading..."></loading-view>

    <tab-navigation :tabs="tabs" />

    <router-view></router-view>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";

import TabNavigation from "@/components/TabNavigation.vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

const router = useRouter();
const firstLoad = ref(true);
const searchInput = ref("");
const loading = false;
const error = false;
const errorMessage = "";

const tabs = computed(() => {
  return [
    { title: "Top Results", link: `/search/results/${encodedSearchInput.value}` },
    { title: "Artists", link: `/search/artists/${encodedSearchInput.value}` },
    { title: "Albums", link: `/search/albums/${encodedSearchInput.value}` },
    { title: "Songs", link: `/search/songs/${encodedSearchInput.value}` },
    { title: "Genres", link: `/search/genres/${encodedSearchInput.value}` },
    { title: "Playlists", link: `/search/playlists/${encodedSearchInput.value}` },
    { title: "Sonos Playlists", link: `/search/sp/${encodedSearchInput.value}` },
  ];
});

const encodedSearchInput = computed(() => {
  return encodeURIComponent(searchInput.value);
});

watch(searchInput, (newVal, oldVal) => {
  if (firstLoad.value) {
    firstLoad.value = false;
  } else if (newVal) {
    router.push(`/search/results/${encodeURIComponent(newVal)}`);
  } else {
    router.push("/search");
  }
});
</script>
