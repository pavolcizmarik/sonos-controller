import { defineStore } from "pinia";
import groupsAPI from "@/services/API/groups";
import { IStore, IZoneGroups } from "@/types/IStore";
import { dragAndDropRoomsMessage, dragAndDropTracksInQueueMessage, PlayState } from "@/constants";
import deepmerge from "deepmerge";
import updateZoneGroup from "@/helpers/updateZoneGroup";

import emptyAlbumArtURL from "@/assets/empty-album-art.png";

export const global = defineStore("global", {
  state: (): IStore => {
    return {
      settings: {
        notifications: {
          dragAndDropRooms: {
            show: true,
            timeout: 8000,
            text: dragAndDropRoomsMessage,
          },
          dragAndDropTracksInQueue: {
            show: true,
            timeout: 8000,
            text: dragAndDropTracksInQueueMessage,
          },
        },
        spotify: {
          refreshToken: "",
          authorized: false,
        },
      },
      hasError: false,
      errorMessage: "",
      loadingMessage: "",
      discoveringSonos: false,
      zoneGroups: [],
      activeZoneGroupId: "",
      defaultAlbumArtURL: emptyAlbumArtURL,
      currentTrackTimer: 0,
      previousRoutePath: "",
    };
  },
  getters: {
    getGroupById(state) {
      return (groupId: string) => state.zoneGroups.find((group) => group.id === groupId);
    },
    activeZoneGroup(state) {
      return () => this.getGroupById(state.activeZoneGroupId);
    },
    groupName() {
      (groupId: string) => {
        const group = this.getGroupById(groupId);
        if (group) {
          return group.members?.length === 0
            ? group.coordinator?.name
            : `${group.coordinator?.name} + ${group.members?.length}`;
        }
        return "";
      };
    },
    albumArtURLForGroup() {
      return (groupId: string) => {
        const group = this.getGroupById(groupId);

        if (group && group.track) {
          return (
            group.track.albumArtURL ||
            // FIXME: Pass radio data to group.track
            group.coordinator?.device?._track?.albumArtURI ||
            this.defaultAlbumArtURL
          );
        }
        return this.defaultAlbumArtURL;
      };
    },
    trackTitleForGroup() {
      return (groupId: string) => {
        const group = this.getGroupById(groupId);

        if (group && group.track) {
          let title = "[Unknown track]";

          // FIXME: Add radio title
          // if (group.track.album) {
          title =
            group.track?.title || group.coordinator?.device?._track?.title || "[Unknown title]";
          // }
          return title;
        }
        return "[TRACK TITLE]";
      };
    },
    artistTitleForGroup() {
      return (groupId: string) => {
        const group = this.getGroupById(groupId);

        if (group && group.track) {
          let artist = "";
          if (group.track.album) {
            artist = group.track.artist || "[Unknown artist]";
          }
          return artist;
        }
        return "[ARTIST NAME]";
      };
    },
  },
  actions: {
    updateZoneGroup(data: IZoneGroups) {
      const index = this.zoneGroups.findIndex((group) => group.id === data.groupId);
      this.zoneGroups[index] = { ...this.zoneGroups[index], ...data.update };
      this.updateTrackTimer();
    },
    setActiveZoneGroup(groupId: string) {
      localStorage.setItem("activeZoneGroupId", groupId);
      this.activeZoneGroupId = groupId;
      this.updateTrackTimer();
    },
    loadActiveZoneGroup() {
      let activeZoneGroupId = localStorage.getItem("activeZoneGroupId") || "";

      const validGroupId = this.zoneGroups.some((zg) => zg.id === activeZoneGroupId);
      if (activeZoneGroupId || validGroupId) {
        // can't continue if there are no zone groups...
        if (this.zoneGroups.length === 0) {
          return;
        }
        // Try to find a zoneGroup that is playing, else pick first zoneGroup in list
        const zoneGroup = this.zoneGroups.find((zg: IZoneGroups) => zg.state === PlayState.playing);
        if (zoneGroup) {
          activeZoneGroupId = zoneGroup.id || "";
        } else {
          activeZoneGroupId = this.zoneGroups[0].id || "";
        }
      }
      this.setActiveZoneGroup(activeZoneGroupId);
    },
    updateTrackTimer() {
      const group = this.activeZoneGroup();
      if (group) {
        if (group.state === PlayState.playing) {
          this.startTrackTimer();
        } else {
          clearInterval(this.currentTrackTimer);
        }
      }
    },
    updateCurrentTrackPosition() {
      const group = this.activeZoneGroup();
      if (group) {
        const newPosition = group.track?.position ? group.track.position + 1 : 0;
        const track = { ...group.track, position: newPosition };

        const data = { groupId: group.id, update: { track } };

        updateZoneGroup(data);
      }
    },
    async startTrackTimer() {
      const group = this.activeZoneGroup();
      if (!group) {
        return;
      }
      // Get an update on the position of this track before starting the time
      const response = await groupsAPI.getTrackPosition(group.id || "");
      const track = { ...group.track, position: response.data.position };

      const data = { groupId: group.id, update: { track } };

      updateZoneGroup(data);

      // Start the track timer now that we have the current position
      const timer = window.setInterval(() => {
        this.updateCurrentTrackPosition();
      }, 1000);
      clearInterval(this.currentTrackTimer);
      this.currentTrackTimer = timer;
    },
    loadSettings() {
      const settings = JSON.parse(localStorage.getItem("settings") || "");
      if (settings) {
        // Merge together
        this.settings = deepmerge(this.settings, settings);
      }
    },
  },
});
