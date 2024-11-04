import { createApp, h } from "vue";
import App from "./docs";

const app = createApp({
  render: () => h(App),
});
app.mount("#app");
