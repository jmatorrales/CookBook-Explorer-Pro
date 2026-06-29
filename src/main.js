import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { Toaster } from "vue-sonner";

createApp(App)
  .use(createPinia())
  .use(router)
  .component("Toaster", Toaster)
  .mount("#app");
