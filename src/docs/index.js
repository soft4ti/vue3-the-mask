import { createApp, h } from "vue";
import App from "./docs.vue";
import "./style.css";
import "./ios-switch.css";

const app = createApp({
  render: () => h(App),
});
app.mount("#app");
