<script setup>
import { RouterLink } from 'vue-router';
import GuestLayout from '@/layouts/GuestLayout.vue';
import { reactive } from 'vue';
import { useAuthStore } from '@/store/auth.js';

const authStore = useAuthStore()

const form = reactive({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
})
</script>

<template>
    <GuestLayout>
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Registration
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="authStore.register(form)">
                <div>
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <div class="mt-2">
                        <input
                            v-model="form.name" id="name" name="name" type="text" required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div class="mt-2">
                        <input
                            v-model="form.email" id="email" name="email" type="email" autocomplete="email" required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div class="mt-2">
                        <input
                            v-model="form.password" id="password" name="password" type="password" required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password_confirmation"
                            class="block text-sm font-medium leading-6 text-gray-900">Password Confirmation</label>
                    </div>
                    <div class="mt-2">
                        <input
                            v-model="form.password_confirmation" id="password_confirmation" name="password_confirmation" type="password" required
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Register
                    </button>
                </div>

                <div v-if="authStore.errors" class="text-red-500 space-y-2">
                    <p v-for="error in authStore.errors">
                        {{ error[0] }}
                    </p>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Already have an account? Then
                <RouterLink to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Sign-in
                </RouterLink>
            </p>
        </div>
    </GuestLayout>
</template>
