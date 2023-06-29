import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import { VueQueryPlugin } from "@tanstack/vue-query";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createAuth0 } from "@auth0/auth0-vue";
import { createApiClient } from "./api";

const vuetify = createVuetify({
  components,
  directives,
});

const auth0 = createAuth0({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  },
});

const apiClient = createApiClient(auth0);

createApp(App)
  .use(VueQueryPlugin)
  .use(router)
  .use(vuetify)
  .use(auth0)
  .use(apiClient)
  .mount("#app");
