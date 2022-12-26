<template>
  <div class="align-center flex w-full items-center justify-start text-left">
    <picture class="mr-4 block h-20 w-20"><img :src="props.track.albumArtURL" /></picture>
    <div class="flex flex-col justify-center">
      <p class="text-slate-300">{{ props.track.title }}</p>
      <p class="text-slate-500">{{ props.track.artist }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  track: {
    type: Object,
    required: true,
  },
});
</script>
