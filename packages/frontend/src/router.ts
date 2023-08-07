import { authGuard } from "@auth0/auth0-vue";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("./views/app/app.container.vue"),
    children: [
      {
        path: "/albums",
        component: () => import("./views/app/album-list.page.vue"),
      },
      {
        path: "/albums/:albumId",
        component: () => import("./views/app/album-photos.page.vue"),
      },
      { path: "/", component: () => import("./views/app/photos.page.vue") },
    ],
    beforeEnter: authGuard,
  },
  {
    path: "/auth/login",
    name: "login",
    component: () => import("./views/auth/login.page.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: {
      path: "/",
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
