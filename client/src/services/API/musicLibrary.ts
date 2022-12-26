import Axios from "@/services/axios";

const axios = new (Axios as any)("/api/library");

export default {
  getAlbumArtists(options: object) {
    return axios.post("/albumArtists", options);
  },

  getAlbums(options: object) {
    return axios.post("/albums", options);
  },

  getSongs(options: object) {
    return axios.post("/tracks", options);
  },

  getGenres(options: object) {
    return axios.post("/genres", options);
  },

  getPlaylists(options: object) {
    return axios.post("/playlists", options);
  },

  getSonosPlaylists(options: object) {
    return axios.post("/sonos_playlists", options);
  },

  getSonosFavorites(options: object) {
    return axios.post("/favorites", options);
  },

  getShares(options: object) {
    return axios.post("/share", options);
  },

  searchAlbumArtists(options: object) {
    return axios.post("/search/albumArtists", options);
  },

  searchAlbums(options: object) {
    return axios.post("/search/albums", options);
  },

  searchSongs(options: object) {
    return axios.post("/search/tracks", options);
  },

  searchGenres(options: object) {
    return axios.post("/search/genres", options);
  },

  searchPlaylists(options: object) {
    return axios.post("/search/playlists", options);
  },

  searchSonosPlaylists(options: object) {
    return axios.post("/search/sonos_playlists", options);
  },

  searchTopResults(options: object) {
    return axios.post("/search/results", options);
  },
};
