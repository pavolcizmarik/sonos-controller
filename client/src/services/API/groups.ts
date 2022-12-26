import Axios from "@/services/axios";

const axios = new (Axios as any)("/api/groups");

export default {
  getTrackPosition(groupId: string) {
    return axios.get(`/${groupId}/trackPosition`);
  },

  partyMode(groupId: string) {
    return axios.post(`/${groupId}/party`);
  },

  ungroupAllZones() {
    return axios.post("/ungroup");
  },

  join(groupId: string, zoneId: string) {
    return axios.post(`/${groupId}/join`, { zoneId });
  },

  play(groupId: string) {
    return axios.put(`/${groupId}/play`);
  },

  playTrackFromQueue(groupId: string, trackNumber: string) {
    return axios.put(`/${groupId}/play/${trackNumber}`);
  },

  playNow(groupId: string, data: object) {
    return axios.put(`${groupId}/playNow`, data);
  },

  playNext(groupId: string, data: object) {
    return axios.put(`/${groupId}/queue/next`, data);
  },

  addToEndOfQueue(groupId: string, data: object) {
    return axios.put(`/${groupId}/queue/end`, data);
  },

  replaceQueueAndPlay(groupId: string, data: object) {
    return axios.put(`/${groupId}/flushPlay`, data);
  },

  pause(groupId: string) {
    return axios.put(`/${groupId}/pause`);
  },

  next(groupId: string) {
    return axios.put(`/${groupId}/next`);
  },

  previous(groupId: string) {
    return axios.put(`/${groupId}/previous`);
  },

  seek(groupId: string, seconds: number) {
    return axios.put(`/${groupId}/seek/${seconds}`);
  },

  volume(groupId: string, volume: number) {
    return axios.put(`/${groupId}/volume/${volume}`);
  },

  mute(groupId: string, mute: boolean) {
    return axios.put(`/${groupId}/mute`, { mute });
  },

  playMode(groupId: string, playMode: string) {
    return axios.put(`/${groupId}/mode`, { playMode });
  },

  saveQueue(groupId: string, playlistTitle: string) {
    return axios.post(`/${groupId}/queue/save`, { playlistTitle });
  },

  clearQueue(groupId: string) {
    return axios.put(`/${groupId}/queue/clear`);
  },

  removeTracksFromQueue(groupId: string, trackIndexes: number) {
    return axios.put(`/${groupId}/queue/remove`, { trackIndexes });
  },

  reorderTracksInQueue(groupId: string, oldIndex: number, newIndex: number) {
    return axios.put(`/${groupId}/queue/reorder`, { oldIndex, newIndex });
  },
};
