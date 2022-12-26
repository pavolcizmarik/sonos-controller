<template>
  <div class="flex flex-col">
    <div v-for="(song, index) in props.songs" :key="index">
      <song-item
        :key="index"
        :song="song"
        :song-number="index + 1"
        :album-mode="albumMode"
        :all-album="allAlbum"
        :is-spotify="isSpotify"
        @hide-menu="showMenu = false"
        @show-menu="showSongMenu"
        @play-now="playNow(obj.selectedSongURI)"
      ></song-item>
    </div>
    <div
      v-if="showMenu && props.songs"
      :style="{ left: menuPosition.x + 'px', top: menuPosition.y + 'px' }"
      class="z-9999 absolute w-44 divide-y divide-gray-100 rounded bg-white shadow dark:bg-gray-700"
    >
      <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
        <li @click="playNow(obj.selectedSongURI)">
          <p
            href="#"
            class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Play Now
          </p>
        </li>
        <li v-if="!isRadio" @click="playNext(obj.selectedSongURI)">
          <p
            href="#"
            class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Play Next
          </p>
        </li>
        <li v-if="!isRadio" @click="addToEndOfQueue(obj.selectedSongURI)">
          <p
            href="#"
            class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Add to End of Queue
          </p>
        </li>
        <li v-if="!isRadio" @click="replaceQueueAndPlay(obj.selectedSongURI)">
          <p
            href="#"
            class="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Replace Queue
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, nextTick, reactive, ref, computed } from "vue";

import SongItem from "@/components/SongItem.vue";

import { playNow, playNext, addToEndOfQueue, replaceQueueAndPlay } from "@/mixins/playActions";

const props = defineProps({
  songs: {
    type: Array as PropType<Array<object>>,
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
  uri: {
    type: String,
    default: "",
  },
});

const showMenu = ref(false);
const menuPosition = reactive({
  x: 0,
  y: 0,
});

const obj = reactive({
  selectedSongURI: "",
});

const isRadio = computed(() => {
  if (obj.selectedSongURI) {
    if (obj.selectedSongURI.startsWith("x-sonosapi-radio:")) {
      return true;
    }
    return false;
  }
  return false;
});

function showSongMenu(event: { clientX: any; clientY: any }, uri: any) {
  showMenu.value = false;
  menuPosition.x = event.clientX;
  menuPosition.y = event.clientY;
  obj.selectedSongURI = uri;
  nextTick(() => {
    showMenu.value = true;
  });
}
</script>
