import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import index from "@/router";

import "@/services/socket";

import "@/styles/tailwind.css";
import "@/styles/main.scss";
import "@/styles/nprogress.scss";

const app = createApp(App);

app.use(createPinia());

app.use(index);

app.mount("#app");
