import { defineStore } from "pinia";
import axios from "@/axios.js";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        authUser: {},
        authToken: ''
    }),

    getters: {
        user: (state) => state.authUser,
        token: (state) => state.authToken
    },

    actions: {
        async getCsrfToken() {
            return await axios.get("/sanctum/csrf-cookie");
        },

        async getUser() {
            let res = await axios.get("/api/user")
            this.authUser = res.data;
        },

        async login(form) {
            await this.getCsrfToken()

            let response = await axios.post("/api/login", {
                email: form.email,
                password: form.password,
            });

            console.log(response)

            if (response.status = 200) {
                this.authUser = response.data.user
                this.authToken = response.data.token

                this.router.push('/')
            }
        },

        async register(form) {
            await this.getCsrfToken()

            let response = await axios.post("/api/register", {
                name: form.name,
                email: form.email,
                password: form.password,
                password_confirmation: form.password_confirmation,
            });

            if (response.status = 200) {
                this.authUser = response.data.user
                this.authToken = response.data.token
                
                this.router.push('/')
            }
        }
    },
});
