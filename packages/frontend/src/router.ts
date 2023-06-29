import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("./pages/app/app.container.vue"),
    children: [
      {
        path: "/albums",
        component: () => import("./pages/app/albums.page.vue"),
      },
      { path: "/", component: () => import("./pages/app/photos.page.vue") },
    ],
  },
  {
    path: "/auth/login",
    component: () => import("./pages/auth/login.page.vue"),
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
