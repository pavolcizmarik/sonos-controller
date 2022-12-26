import io from "socket.io-client";
import store from "@/store";

const socket = io(import.meta.env.VITE_PROXY);

socket.on("Discovering Sonos Devices", () => {
  store.global.$patch({
    discoveringSonos: true,
    hasError: false,
    loadingMessage: "Searching for your Sonos System...",
  });
});

socket.on("Sonos Device Discovery Complete", (zoneGroups) => {
  store.global.$patch({
    discoveringSonos: false,
    hasError: false,
    zoneGroups: zoneGroups,
  });
  store.global.loadActiveZoneGroup();
});

socket.on("No Sonos Devices Found On Network", () => {
  store.global.$patch({
    discoveringSonos: false,
    hasError: true,
    errorMessage: "No Sonos System was found on your network.",
  });
});

socket.on("An Unknown Error Occurred While Retrieving Devices", (error) => {
  store.global.$patch({
    discoveringSonos: false,
    hasError: true,
    errorMessage: `An unexpected error occurred while searching for your Sonos System: ${error}`,
  });
});

socket.on("Sonos Event Data Received", (data) => {
  store.global.updateZoneGroup(data);
});

socket.on("disconnect", () => {
  store.global.$patch({
    hasError: true,
    errorMessage: "We got disconnected from the Sonos Network. Is the application server running?",
  });
});
