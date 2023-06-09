import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { auth0 } from "./auth";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(VueQueryPlugin)
  .use(router)
  .use(vuetify)
  .use(auth0)
  .mount("#app");
