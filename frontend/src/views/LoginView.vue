<script setup>
import { RouterLink, useRouter } from "vue-router";
import GuestLayout from "@/layouts/GuestLayout.vue";
import { reactive } from "vue";
import { useAuthStore } from "@/store/auth.js";

const authStore = useAuthStore()

const form = reactive({
    email: "",
    password: "",
});
</script>

<template>
    <GuestLayout>
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign In
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="authStore.login(form)">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input v-model="form.email" id="email" name="email" type="email" autocomplete="email" required=""
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div class="mt-2">
                        <input v-model="form.password" id="password" name="password" type="password"
                            autocomplete="current-password" required=""
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Sign in
                    </button>
                </div>

                <div v-if="authStore.errors" class="text-red-500 space-y-2">
                    <p v-for="error in authStore.errors">
                        {{ error[0] }}
                    </p>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Don't have an account? Then
                <RouterLink to="/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Register
                </RouterLink>
            </p>
        </div>
    </GuestLayout>
</template>
