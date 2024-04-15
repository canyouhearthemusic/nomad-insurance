import { createRouter, createWebHistory } from "vue-router";

import LoginView from "@/views/LoginView.vue"
import RegisterView from "@/views/RegisterView.vue"
import IndexView from "@/views/contacts/IndexView.vue"
import CreateView from "@/views/contacts/CreateView.vue"
import EditView from "@/views/contacts/EditView.vue"
import { useAuthStore } from "@/store/auth";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "contacts.index",
            meta: {
                requiresAuth: true
            },
            component: IndexView
        },
        {
            path: "/contacts/create",
            name: "contacts.create",
            meta: {
                requiresAuth: true
            },
            component: CreateView
        },
        {
            path: "/contacts/:id/edit",
            name: "contacts.edit",
            meta: {
                requiresAuth: true
            },
            props: true,
            component: EditView
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