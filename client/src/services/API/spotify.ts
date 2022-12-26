import Axios from "@/services/axios";

const axios = new (Axios as any)("/api/spotify");
export default {
  getAuthURL() {
    return axios.get("/authorize");
  },
  authorize(code: any) {
    return axios.post("/authorizeCode", { code });
  },
  checkAuthorization(tokens: string) {
    return axios.post("/checkAuthorization", tokens);
  },
  getUserPlaylists() {
    return axios.get("/playlists");
  },
  getUserAlbums() {
    return axios.get("/albums");
  },
  getUserSongs() {
    return axios.get("/songs");
  },
  get(path: string) {
    return axios.get(path.replace("/spotify", ""));
  },
};
