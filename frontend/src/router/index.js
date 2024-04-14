import { createRouter, createWebHistory } from "vue-router";

import HelloWorld from "@/components/HelloWorld.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import GuestLayout from "@/layouts/GuestLayout.vue";
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HelloWorld,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
  ],
});

export default router;
