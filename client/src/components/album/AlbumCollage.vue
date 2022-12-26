<template>
  <div v-if="images.length >= 4">
    <div>
      <div>
        <div class="pb-[100%]"></div>
        <div :style="{ backgroundImage: 'url(' + props.images[0] + ')' }"></div>
      </div>
      <div>
        <div class="pb-[100%]"></div>
        <div :style="{ backgroundImage: 'url(' + props.images[1] + ')' }"></div>
      </div>
    </div>
    <div>
      <div>
        <div class="pb-[100%]"></div>
        <div :style="{ backgroundImage: 'url(' + props.images[2] + ')' }"></div>
      </div>
      <div>
        <div class="pb-[100%]"></div>
        <div :style="{ backgroundImage: 'url(' + props.images[3] + ')' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  images: {
    type: Array,
    default: () => [],
  },
});
</script>
