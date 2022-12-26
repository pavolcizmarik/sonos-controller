<template>
  <div
    class="fixed top-auto bottom-0 w-full bg-white p-4 shadow dark:bg-gray-900 md:flex md:items-center md:justify-between md:p-6"
  >
    <div class="flex w-full items-center justify-start">
      <TrackMetadata :track="track" />
      <div class="flex w-full items-center justify-center">
        <TrackControl />
      </div>
      <div class="flex w-full items-center justify-end">
        <VolumeBar />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import appStore from "@/store";
import TrackMetadata from "@/components/player-bar/TrackMetadata.vue";
import TrackControl from "@/components/player-bar/TrackControl.vue";
import VolumeBar from "@/components/player-bar/VolumeBar.vue";
import { computed, reactive } from "vue";
// import { IGroup, IZoneGroups } from "@/types/IStore";

const activeZoneGroupId = computed(() => appStore.global.activeZoneGroupId);
const track = reactive({
  title: computed(() => appStore.global.trackTitleForGroup(activeZoneGroupId.value)),
  artist: computed(() => appStore.global.artistTitleForGroup(activeZoneGroupId.value)),
  albumArtURL: computed(() => appStore.global.albumArtURLForGroup(activeZoneGroupId.value)),
});
</script>
