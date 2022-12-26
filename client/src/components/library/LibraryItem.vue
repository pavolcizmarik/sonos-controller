<template>
  <div class="max-w-[160px]">
    <router-link :to="path">
      <div v-if="!albumCollageImages.length">
        <div
          :key="albumArtURL"
          :style="{
            backgroundImage: 'url(' + albumArtURL + ')',
          }"
          class="block h-40 w-40 cursor-pointer bg-cover bg-center bg-no-repeat"
        ></div>
      </div>
      <album-collage v-else :images="albumCollageImages"></album-collage>
      <div class="w-100 my-4 overflow-hidden overflow-ellipsis whitespace-nowrap text-slate-300">
        {{ item.title }}
      </div>
    </router-link>
    <router-link
      v-if="item.artist && showSubtitle"
      :to="artistLink"
      class="item-link text-truncate text-xs-center pa-0"
    >
      <div class="w-100 my-4 overflow-hidden overflow-ellipsis whitespace-nowrap text-slate-300">
        {{ item.artist }}
      </div>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

import appStore from "@/store";
import { encode } from "js-base64";

import AlbumCollage from "@/components/album/AlbumCollage.vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  toPrefix: {
    type: String,
    required: true,
  },
  allPrefix: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  showSubtitle: {
    type: Boolean,
    default: true,
  },
  isShare: {
    type: Boolean,
    default: false,
  },
  isSpotify: {
    type: Boolean,
    default: false,
  },
});

const albumArtURL = computed(() => {
  return albumCollageImages.value.length
    ? ""
    : props.item.albumArtURI || appStore.global.defaultAlbumArtURL;
});

const path = computed(() => {
  if (props.item.title === "All") {
    if (props.allPrefix === "/genre/songs") {
      return `/genre/all/${encode(props.name)}/songs`;
    }
    return `${props.allPrefix}/all/${encode(props.name)}`;
  }
  if (props.isShare) {
    return `${props.toPrefix}/${encode(`${props.name}/${props.item.title}`)}`;
  }
  if (props.isSpotify) {
    return `${props.toPrefix}/${props.item.uri.split(":").slice(-1)[0]}`;
  }
  return `${props.toPrefix}/${encode(props.item.title)}`;
});

const encodedArtist = computed(() => {
  return encode(props.item.artist);
});

const artistLink = computed(() => {
  if (props.isSpotify) {
    return `/spotify/artist/${props.item.artistURI}`;
  }
  return `/artist/${encodedArtist.value}`;
});

const albumCollageImages = computed(() => {
  if (Array.isArray(props.item.albumArtURI)) {
    return props.item.albumArtURI;
  }
  return [];
});
</script>
