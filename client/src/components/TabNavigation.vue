<template>
  <div
    class="mb-8 border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400"
  >
    <ul class="-mb-px flex flex-wrap justify-center">
      <li v-for="(tab, index) in tabs" :key="index" class="mr-2">
        <router-link
          :to="tab.link"
          class="inline-block cursor-pointer rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
          >{{ tab.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  tabs: {
    type: Object,
    required: true,
  },
});
</script>
