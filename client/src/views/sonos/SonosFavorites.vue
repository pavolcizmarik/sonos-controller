<template>
  <section>
    <Suspense>
      <template #default>
        <div>
          <load-library-on-scroll
            :async-load-method="loadMethod"
            :library-item="sonosFavorites"
            @loading-error="loadingError"
            @loaded-items="loadedItems"
          >
          </load-library-on-scroll>
          <ErrorView v-if="error" absolute :message="errorMessage"></ErrorView>
          <LoadingView v-else-if="loading" absolute message="Loading..."></LoadingView>
          <div v-else wrap>
            <library-item-count
              :total="sonosFavorites.total"
              label="Favorites"
            ></library-item-count>
            <div class="xs12 flex flex-wrap justify-center gap-8">
              <library-item
                v-for="item in items"
                :key="item.uri"
                :item="item"
                to-prefix=""
                :is-spotify="false"
              ></library-item>
            </div>
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
import { ref, computed, Ref } from "vue";

import deepmerge from "deepmerge";

// import SongList from "@/components/SongList.vue";
import LibraryItem from "@/components/library/LibraryItem.vue";
import LibraryItemCount from "@/components/library/LibraryItemCount.vue";
import LoadLibraryOnScroll from "@/components/library/LoadLibraryOnScroll.vue";
import musicLibrary from "@/services/API/musicLibrary";

const sonosFavorites = ref<any>({});
const loading = ref<Boolean>(true);
const error = ref<Boolean>(false);
const errorMessage = ref<string>("");

const items = computed(() => sonosFavorites.value.items || []);

const loadMethod = computed(() => musicLibrary.getSonosFavorites);

const loadedItems = function (data: any) {
  loading.value = false;
  sonosFavorites.value = deepmerge(sonosFavorites, data);
};

const loadingError = function (error: Ref) {
  loading.value = false;
  error.value = true;
  errorMessage.value = `${error.value.response.status}: ${error.value.response.data}`;
};
</script>
