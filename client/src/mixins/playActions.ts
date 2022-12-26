import { computed } from "vue";
import appStore from "@/store";
import groupsAPI from "../services/API/groups";

const activeZoneGroupId = computed(() => appStore.global.activeZoneGroupId);

const getURIData = function (data: string) {
  return typeof data === "string" ? { uri: data } : data;
};

export const playNow = (uriObject: string) => {
  const uriData = getURIData(uriObject);
  groupsAPI.playNow(activeZoneGroupId.value, uriData);
};

export const playNext = (uriObject: string) => {
  const uriData = getURIData(uriObject);
  groupsAPI.playNext(activeZoneGroupId.value, uriData);
};

export const addToEndOfQueue = (uriObject: string) => {
  const uriData = getURIData(uriObject);
  groupsAPI.addToEndOfQueue(activeZoneGroupId.value, uriData);
};

export const replaceQueueAndPlay = (uriObject: string) => {
  const uriData = getURIData(uriObject);
  groupsAPI.replaceQueueAndPlay(activeZoneGroupId.value, uriData);
};
