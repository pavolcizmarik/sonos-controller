<template>
  <div class="align-center flex w-52 items-center justify-start text-left">
    <volume-icon class="mr-4 text-2xl text-slate-300" @click="toggleMute" />
    <slider
      v-model="getVolume"
      class="block h-1.5 w-full appearance-none rounded-full bg-slate-300 focus:shadow-none focus:outline-none focus:ring-0"
      v-bind="{ showTooltip: 'drag' }"
      @change="setVolume"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import appStore from "@/store";
import Slider from "@vueform/slider";
import groupsAPI from "@/services/API/groups";
import updateZoneGroup from "@/helpers/updateZoneGroup";
import { VolumeHigh, VolumeMedium, VolumeLow, VolumeOff } from "mdue";

const activeZoneGroup = computed(() => appStore.global.activeZoneGroup());
const activeZoneGroupId = computed(() => appStore.global.activeZoneGroupId);

const getVolume = computed({
  get() {
    if (activeZoneGroup.value) {
      return activeZoneGroup.value.volume;
    }
    return 0;
  },
  set() {
    // WARN: Write operation failed: computed value is readonly
  },
});

const mute = computed(() => {
  if (activeZoneGroup.value) {
    return activeZoneGroup.value.mute;
  }
  return false;
});

const VolumeIcon = computed(() => {
  if (mute.value) {
    return VolumeOff;
  }

  switch (true) {
    case getVolume.value > 50:
      return VolumeHigh;

    case getVolume.value > 25:
      return VolumeMedium;

    default:
      return VolumeLow;
  }
});

function setVolume(volume: number) {
  if (activeZoneGroup.value) {
    const data = { groupId: activeZoneGroupId.value, update: { volume } };

    updateZoneGroup(data);

    groupsAPI.volume(activeZoneGroupId.value, volume);
  }
}

function toggleMute() {
  if (activeZoneGroup.value) {
    const mute = !activeZoneGroup.value.mute;
    const data = { groupId: activeZoneGroupId.value, update: { mute } };

    updateZoneGroup(data);

    groupsAPI.mute(activeZoneGroupId.value, mute);
  }
}
</script>
