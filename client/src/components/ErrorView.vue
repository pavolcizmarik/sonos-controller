<template>
  <div class="absolute left-0 top-1/2">
    {{ errorMessage }}
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import appStore from "@/store";

const props = defineProps({
  message: {
    type: String,
    default: "",
  },
});

const errorMessage = computed(() => props.message || appStore.global.errorMessage);
</script>
