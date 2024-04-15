import { createRouter, createWebHistory } from "vue-router";

import HelloWorld from "@/components/HelloWorld.vue";
import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"
import { useAuthStore } from "@/store/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            meta: {
                requiresAuth: true
            },
            component: HelloWorld,
        },
        {
            path: "/login",
            name: "login",
            meta: {
                requiresAuth: false
            },
            component: LoginView,
        },
        {
            path: "/register",
            name: "register",
            meta: {
                requiresAuth: false
            },
            component: RegisterView,
        },
    ],
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.user) {
        next('/login')
    } else if (!to.meta.requiresAuth && authStore.user) {
        next('/')
    } else {
        next()
    }
})

export default router;