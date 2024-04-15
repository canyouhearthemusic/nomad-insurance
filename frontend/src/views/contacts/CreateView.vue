<script setup>
import AppLayout from "@/layouts/AppLayout.vue"
import { reactive } from "vue";
import useContacts from "@/composables/contacts.js"

const { store, errors } = useContacts()

console.log(errors)

const form = reactive({
    name: "",
    phone_number: null,
    description: "",
})
</script>

<template>
    <AppLayout>
        <form @submit.prevent="store(form)" class="mx-auto max-w-xl mt-8">
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                    <label for="name" class="block text-sm font-semibold leading-6 text-gray-900">Name</label>
                    <div class="mt-2.5">
                        <input v-model="form.name" type="text" name="name" id="name"
                            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <label for="phone_number" class="block text-sm font-semibold leading-6 text-gray-900">Phone
                        Number</label>
                    <div class="mt-2.5">
                        <input v-model="form.phone_number" type="text" name="phone_number" id="phone_number"
                            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div class="sm:col-span-2">
                    <label for="description" class="block text-sm font-semibold leading-6 text-gray-900">Description</label>
                    <div class="mt-2.5">
                        <textarea v-model="form.description" name="description" id="description" rows="4"
                            class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
            </div>
            <div class="mt-10">
                <button type="submit"
                    class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Create
                </button>
            </div>

            <div v-if="errors" class="mt-4 text-red-500 space-y-2">
                <p v-for="error in errors">
                    {{ error[0] }}
                </p>
            </div>
        </form>
    </AppLayout>
</template>