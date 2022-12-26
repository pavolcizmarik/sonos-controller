<template>
  <section>
    <h1 class="my-8 text-center text-4xl uppercase text-slate-300">{{ props.title }}</h1>

    <div class="justify-content-center align-items-center flex flex-col">
      <img class="m-auto mb-4 h-1/4 w-1/4 drop-shadow-md" :src="track.albumArtURL" />
      <p class="text-center text-xl text-slate-300">{{ track.title }}</p>
      <p class="text-center text-slate-500">{{ track.artist }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import appStore from "@/store";
import { computed, reactive } from "vue";

const activeZoneGroupId = computed(() => appStore.global.activeZoneGroupId);
const track = reactive({
  title: computed(() => appStore.global.trackTitleForGroup(activeZoneGroupId.value)),
  artist: computed(() => appStore.global.artistTitleForGroup(activeZoneGroupId.value)),
  albumArtURL: computed(() => appStore.global.albumArtURLForGroup(activeZoneGroupId.value)),
});
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>
