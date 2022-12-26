<template>
  <div class="hidden"></div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount } from "vue";

const props = defineProps({
  asyncLoadMethod: {
    type: Function,
    required: true,
  },
  total: {
    type: Number,
    default: 100,
  },
  libraryItem: {
    type: Object,
    required: true,
  },
  detailPath: {
    type: String,
    default: null,
  },
  searchTerm: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["loaded-items", "loading-error"]);

let start = 0;
let loadMoreItems = true;
let loading = false;

const duplicateRequest = computed(() => {
  const totalLength = start + props.total;
  if (props.libraryItem.items && props.libraryItem.items.length >= totalLength) {
    return true;
  }
  return false;
});

window.addEventListener("scroll", loadOnScroll, { passive: true });

loadItems();

onBeforeUnmount(() => window.removeEventListener("scroll", loadOnScroll));

function loadOnScroll() {
  if (bottomVisible()) {
    loadItems();
  }
}

function bottomVisible() {
  const { scrollY } = window;
  // Multiple, to start loading before we get to bottom
  const visible = document.documentElement.clientHeight * 2;
  const pageHeight = document.documentElement.scrollHeight;
  const bottomOfPage = visible + scrollY >= pageHeight;
  return bottomOfPage || pageHeight < visible;
}

async function loadItems() {
  if (!loadMoreItems) {
    return;
  }
  if (loading) {
    return;
  }
  if (duplicateRequest.value) {
    loadMoreItems = false;
    return;
  }
  try {
    loading = true;
    let result;
    const options = { start: start, total: props.total, searchTerm: props.searchTerm };
    if (props.detailPath) {
      result = await props.asyncLoadMethod(props.detailPath, options);
    } else {
      result = await props.asyncLoadMethod(options);
    }
    if (result.data.total === "0") {
      const error: any = new Error("404: Not Found");
      error.response = {
        status: 404,
        data: "Item Not Found",
      };
      throw error;
    }
    // Update the start for the next load
    const returnedCount = parseInt(result.data.returned, 10);
    if (returnedCount === props.total) {
      start += props.total;
    } else {
      start = returnedCount;
    }
    const totalItems = parseInt(result.data.total, 10);
    if (props.libraryItem.items) {
      loadMoreItems = props.libraryItem.items.length + returnedCount < totalItems;
    } else {
      loadMoreItems = returnedCount !== totalItems;
    }
    emit("loaded-items", result.data);
    loading = false;
  } catch (error) {
    emit("loading-error", error);
  }
}
</script>
