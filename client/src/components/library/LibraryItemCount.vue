<template>
  <div class="my-4 flex items-center justify-center text-slate-500">
    <span class="grey--text text-uppercase caption font-weight-bold"
      >{{ total }} {{ text }} available</span
    >
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
  label: {
    type: [String, Array<String>],
    required: true,
  },
});

const text = computed(() => (props.total === 1 ? props.label.slice(0, -1) : props.label));
</script>
