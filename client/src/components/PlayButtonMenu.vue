<template>
  <button>Play</button>
  <ul>
    <li class="pointer" @click="playNow(obj.uriObject)">
      <p>Play Now</p>
    </li>
    <li @click="playNext(obj.uriObject)">
      <p>Play Next</p>
    </li>
    <li @click="addToEndOfQueue(obj.uriObject)">
      <p>Add to End of Queue</p>
    </li>
    <li @click="replaceQueueAndPlay(obj.uriObject)">
      <p>Replace Queue</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { playNow, playNext, addToEndOfQueue, replaceQueueAndPlay } from "@/mixins/playActions";

const obj = reactive({
  uriObject: "",
});
</script>
