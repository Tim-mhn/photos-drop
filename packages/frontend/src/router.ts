import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  { path: "/", component: () => import("./pages/PhotosPage.vue") },
  { path: "/albums", component: () => import("./pages/AlbumsPage.vue") },
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
