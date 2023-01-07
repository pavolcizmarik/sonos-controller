<template>
  <section>
    <h1 class="my-8 text-center text-4xl uppercase text-slate-300">{{ props.title }}</h1>

    <Suspense>
      <template #default>
        <div>
          <load-library-on-scroll
            :async-load-method="loadMethod"
            :library-item="playlists"
            :search-term="searchTerm"
            @loading-error="loadingError"
            @loaded-items="loadedItems"
          >
          </load-library-on-scroll>
          <ErrorView v-if="error" absolute :message="errorMessage"></ErrorView>
          <LoadingView v-else-if="loading" absolute message="Loading..."></LoadingView>
          <div v-else row wrap>
            <library-item-count :total="playlists.total" label="Playlists"></library-item-count>
            <library-item
              v-for="item in items"
              :key="item.uri"
              :item="item"
              to-prefix="/playlist"
            ></library-item>
          </div>
        </div>
      </template>
      <template #fallback>
        <div class="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          <p class="text-center text-slate-300">Loading...</p>
        </div>
      </template>
    </Suspense>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import deepmerge from "deepmerge";
import musicLibrary from "@/services/API/musicLibrary";
import LoadLibraryOnScroll from "@/components/library/LoadLibraryOnScroll.vue";
import ErrorView from "@/components/ErrorView.vue";
import LoadingView from "@/components/LoadingView.vue";
import LibraryItemCount from "@/components/library/LibraryItemCount.vue";
import LibraryItem from "@/components/library/LibraryItem.vue";

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
const params = computed(() => route.params);

const playlists = ref<any>({});
const loading = ref(true);
const error = ref(false);
const errorMessage = ref("");

const loadedItems = function (data: any) {
  loading.value = false;
  playlists.value = deepmerge(playlists, data);
};

const loadingError = function (error: any) {
  loading.value = false;
  error.value = true;
  errorMessage.value = `${error.response.status}: ${error.response.data}`;
};

const items = computed(() => playlists.value.items || []);

const searchTerm = computed(() => {
  if (props.search) {
    return params.value.pathMatch;
  }
  return "";
});

const loadMethod = computed(() =>
  props.search ? musicLibrary.searchPlaylists : musicLibrary.getPlaylists
);
</script>
