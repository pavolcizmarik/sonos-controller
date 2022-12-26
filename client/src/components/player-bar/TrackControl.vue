<template>
  <div class="flex w-full flex-col">
    <div class="flex w-full items-center justify-center text-center">
      <button-control />
    </div>

    <div class="player-progress flex w-full items-center justify-center text-center">
      <p class="player-progress__current-time m-0 mr-3 text-sm text-slate-300">
        {{ trackElapsedTime }}
      </p>
      <div class="relative w-full">
        <slider
          v-model="getTrackPosition"
          :disabled="!canSeek"
          v-bind="sliderConfig"
          class="player-progress__slider block h-1.5 w-full appearance-none rounded-full bg-slate-300 focus:shadow-none focus:outline-none focus:ring-0"
          @change="setTrackPosition"
        />
      </div>
      <p class="player-progress__duration m-0 ml-3 text-sm text-slate-300">{{ trackDuration }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import appStore from "@/store";
import groupsAPI from "@/services/API/groups";
import updateZoneGroup from "@/helpers/updateZoneGroup";
import secondsToTimeString from "@/helpers/secondsToTimeString";
import { TransportActions } from "@/constants";

import ButtonControl from "@/components/player-bar/ButtonControl.vue";
import Slider from "@vueform/slider";
import "@vueform/slider/themes/default.css";

const activeZoneGroup = computed(() => appStore.global.activeZoneGroup());
const activeZoneGroupId = computed(() => appStore.global.activeZoneGroupId);

const sliderConfig = {
  tooltips: false,
};

const trackElapsedTime = computed(() => {
  if (activeZoneGroup.value && activeZoneGroup.value?.track?.position > 0) {
    const position = secondsToTimeString(activeZoneGroup.value.track.position);
    return position;
  }
  return secondsToTimeString(0);
});

const trackDuration = computed(() => {
  if (activeZoneGroup.value && activeZoneGroup.value?.track?.duration > 0) {
    const duration = secondsToTimeString(activeZoneGroup.value.track.duration);
    return duration;
  }
  return secondsToTimeString(0);
});

const getTrackPosition = computed({
  get() {
    if (activeZoneGroup.value) {
      const position = activeZoneGroup.value.track?.position || 0;
      const duration = activeZoneGroup.value.track?.duration || 0;

      return (position / duration) * 100 || 0;
    }
    return 0;
  },
  set() {
    // WARN: Write operation failed: computed value is readonly
  },
});

const canSeek = computed(() => {
  if (activeZoneGroup.value) {
    return activeZoneGroup.value.actions.some((action: string) => action === TransportActions.seek);
  }
  return false;
});

function setTrackPosition(position: number) {
  if (activeZoneGroup.value) {
    const positionPercentage = position * 0.01;
    const newPosition = Math.round(activeZoneGroup.value.track.duration * positionPercentage);
    const track = { ...activeZoneGroup.value.track, position: newPosition };
    const data = { groupId: activeZoneGroupId.value, update: { track } };

    updateZoneGroup(data);

    groupsAPI.seek(activeZoneGroupId.value, newPosition);
  }
}
</script>

<style>
:root {
  --slider-connect-bg: #3b82f6;
  --slider-tooltip-bg: #3b82f6;
  --slider-handle-ring-color: #3b82f6;
}
</style>
