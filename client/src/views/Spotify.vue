<template>
  <section>
    <h1 class="my-8 text-center text-4xl uppercase text-slate-300">{{ props.title }}</h1>

    <Suspense>
      <template #default>
        <spotify-homepage />
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
import SpotifyHomepage from "@/components/spotify/SpotifyHomepage.vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>
