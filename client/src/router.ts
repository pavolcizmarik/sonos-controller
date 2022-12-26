import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });

const routes = [
  {
    path: "/",
    name: "NowPlaying",
    component: () => import("@/views/PlayingNow.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/Search.vue"),
    children: [
      {
        path: "/search/results/:catchAll(.*)",
        name: "SearchResults",
        component: () => import("@/views/search/SearchTopResults.vue"),
      },
      {
        path: "/search/artists/:catchAll(.*)",
        name: "SearchArtists",
        component: () => import("@/views/search/SearchArtists.vue"),
        props: { search: true },
      },
      {
        path: "/search/albums/:catchAll(.*)",
        name: "SearchAlbums",
        component: () => import("@/views/search/SearchAlbums.vue"),
        props: { search: true },
      },
      {
        path: "/search/songs/:catchAll(.*)",
        name: "SearchSongs",
        component: () => import("@/views/search/SearchSongs.vue"),
        props: { search: true },
      },
      {
        path: "/search/genres/:catchAll(.*)",
        name: "SearchGenres",
        component: () => import("@/views/search/SearchGenres.vue"),
        props: { search: true },
      },
      {
        path: "/search/playlists/:catchAll(.*)",
        name: "SearchPlaylists",
        component: () => import("@/views/search/SearchPlaylists.vue"),
        props: { search: true },
      },
      {
        path: "/search/sp/:catchAll(.*)",
        name: "SearchSonosPlaylists",
        component: () => import("@/views/search/SearchSonosPlaylists.vue"),
        props: { search: true },
      },
    ],
  },
  {
    path: "/rooms",
    name: "Rooms",
    component: () => import("@/views/Rooms.vue"),
  },
  {
    path: "/library",
    name: "Library",
    component: () => import("@/views/Library.vue"),
    children: [
      {
        path: "",
        name: "library",
        redirect: { name: "Artists" },
      },
      {
        path: "/library/artists",
        name: "Artists",
        component: () => import("@/views/library/Artists.vue"),
      },
      {
        path: "/library/albums",
        name: "Albums",
        component: () => import("@/views/library/Albums.vue"),
      },
      {
        path: "/library/songs",
        name: "Songs",
        component: () => import("@/views/library/Songs.vue"),
      },
      {
        path: "/library/genres",
        name: "Genres",
        component: () => import("@/views/library/Genres.vue"),
      },
      {
        path: "/library/playlists",
        name: "Playlists",
        component: () => import("@/views/library/Playlists.vue"),
      },
      {
        path: "/library/share",
        name: "Shares",
        component: () => import("@/views/library/Shares.vue"),
      },
    ],
  },
  {
    path: "/sonos",
    name: "Sonos",
    component: () => import("@/views/Sonos.vue"),
  },
  {
    path: "/spotify",
    component: () => import("@/views/Spotify.vue"),
    name: "Spotify",
    children: [
      {
        path: "",
        name: "Spotify",
        redirect: { name: "SpotifyPlaylists" },
      },
      {
        path: "/spotify/playlists",
        name: "SpotifyPlaylists",
        component: () => import("@/views/spotify/SpotifyPlaylists.vue"),
      },
      {
        path: "/spotify/songs",
        name: "SpotifySongs",
        component: () => import("@/views/spotify/SpotifySongs.vue"),
      },
    ],
  },
  {
    path: "/spotify/playlist/:catchAll(.*)",
    name: "SpotifyPlaylist",
    component: () => import("@/views/spotify/SpotifyAlbum.vue"),
    props: { isPlaylist: true },
  },
  {
    path: "/spotify/album/:catchAll(.*)",
    name: "SpotifyAlbum",
    component: () => import("@/views/spotify/SpotifyAlbum.vue"),
  },
  {
    path: "/spotify/artist/:catchAll(.*)",
    name: "SpotifyArtist",
    component: () => import("@/views/spotify/SpotifyArtist.vue"),
  },
];

const index = createRouter({
  history: createWebHistory(),
  routes,
});

index.beforeEach((to, from) => {
  if (!NProgress.isStarted()) {
    NProgress.start();
  }
});

index.afterEach((to, from) => {
  NProgress.done();
});

export default index;
