import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import authRoutes from "./auth/auth-routes";
import clientRoutes from "./client/client-routes";
import { authGuard } from "./guards/guard";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/auth/client/login",
  },
  ...clientRoutes,
  ...authRoutes,
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../shared/components/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition; // back/forward button
    } else {
      return { top: 0 }; // normal navigation
    }
  },
});
router.beforeEach(authGuard);

export default router;
