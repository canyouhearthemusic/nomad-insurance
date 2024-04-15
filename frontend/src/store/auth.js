import { defineStore } from "pinia";
import axios from "@/axios.js";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        authUser: {},
        authToken: '',
        authErrors: {},
    }),

    getters: {
        user: (state) => state.authUser,
        token: (state) => state.authToken,
        errors: (state) => state.authErrors,
    },

    actions: {
        async getCsrfToken() {
            return await axios.get("/sanctum/csrf-cookie")
        },

        async getUser() {
            let res = await axios.get("/api/user")
            this.authUser = res.data
        },

        async login(form) {
            this.authErrors = {}

            await this.getCsrfToken()

            try {
                let response = await axios.post("/api/login", {
                    email: form.email,
                    password: form.password,
                })

                if (response.status = 200) {
                    this.authUser = response.data.user
                    this.authToken = response.data.token

                    this.router.push('/')
                }
            } catch (error) {
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors
                }
            }
        },

        async register(form) {
            this.authErrors = {}

            await this.getCsrfToken()

            try {
                let response = await axios.post("/api/register", {
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    password_confirmation: form.password_confirmation,
                })

                if (response.status = 200) {
                    this.authUser = response.data.user
                    this.authToken = response.data.token

                    this.router.push('/')
                }
            } catch (error) {
                if (error.response.status === 422) {
                    this.authErrors = error.response.data.errors
                }
            }
        },

        async logout() {
            await this.getCsrfToken()

            let response = await axios.post("/api/logout")

            if (response.status = 200) {
                this.authUser = {}
                this.authToken = ''

                this.router.push('/')
            }
        },
    },
})
