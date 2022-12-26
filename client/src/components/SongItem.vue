<template>
  <div
    class="border-b-1 m-auto flex max-w-5xl items-center justify-start border-b border-b-gray-700"
    :class="queueItemClasses"
  >
    <div class="flex-shrink-0 flex-grow-0 basis-0">
      <div
        class="m-auto my-4 h-10 w-10 bg-cover drop-shadow-md"
        :style="{ backgroundImage: 'url(' + albumArtURL + ')' }"
      />
    </div>

    <div class="flex-shrink-0 flex-grow-0 basis-80">
      <div v-if="!albumMode || allAlbum">
        <div>
          <div class="ml-4 text-slate-300">
            {{ song.title }}
          </div>
          <router-link v-if="!albumMode" :to="artistLink" class="ml-4 text-sm text-slate-500">
            {{ song.artist }}
          </router-link>
        </div>
      </div>
    </div>

    <div class="flex-1">
      <router-link v-if="song.album" :to="albumLink" class="ml-4 text-slate-500">
        {{ song.album }}
      </router-link>
    </div>

    <div>
      <p class="cursor-pointer" @click="playNow(props.song.uri)">
        <play-circle-outline class="mx-3 block h-6 w-6 cursor-pointer text-slate-300" />
      </p>
    </div>

    <div class="flex-shrink-0 flex-grow-0 basis-0">
      <div class="text-right" @click="showMenu">
        <dots-vertical class="mx-3 block h-6 w-6 cursor-pointer text-slate-300" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import appStore from "@/store";
import { playNow } from "@/mixins/playActions";
import { encode } from "js-base64";

import { DotsVertical, PlayCircleOutline } from "mdue";

const props = defineProps({
  song: {
    type: Object,
    required: true,
  },
  songNumber: {
    type: Number,
    required: true,
  },
  albumMode: {
    type: Boolean,
    default: false,
  },
  allAlbum: {
    type: Boolean,
    default: false,
  },
  doubleClickURIData: {
    type: Object,
    default: null,
  },
  isSpotify: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["show-menu", "play-now"]);

// const activeZoneGroupId = computed(() => appStore.global.activeZoneGroupId);
const activeZoneGroup = computed(() => appStore.global.getActiveZoneGroup);
const albumArtURL = computed(() => props.song.albumArtURI || appStore.global.defaultAlbumArtURL);
const encodedArtist = computed(() => encode(props.song.artist));
const encodedAlbum = computed(() => encode(props.song.album));
// const doubleClickURIDataProp = ref(props.doubleClickURIData);
const active = computed(() => {
  if (activeZoneGroup.value) {
    return activeZoneGroup.value.track.uri === props.song.uri;
  }
  return false;
});
const queueItemClasses = computed(() => {
  let classes = "";
  if (active.value) {
    classes += "active";
  }
  return classes;
});
const artistLink = computed(() => {
  if (props.isSpotify) {
    return `/spotify/artist/${props.song.artistURI}`;
  }
  return `/artist/${encodedArtist.value}`;
});
const albumLink = computed(() => {
  if (props.isSpotify) {
    return `/spotify/album/${props.song.albumURI}`;
  }
  return `/album/${encodedAlbum.value}`;
});

function showMenu(event: MouseEvent) {
  emit("show-menu", event, props.song.uri);
}
</script>
