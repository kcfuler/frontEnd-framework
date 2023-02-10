import { createApp } from "vue";
import App from "./App.vue";
import { Notification } from "@arco-design/web-vue";
import "./style.css";

const app = createApp(App);
app.mount("#app");
Notification._context = app._context;
