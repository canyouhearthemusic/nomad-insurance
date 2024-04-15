<script setup>
import { onMounted, ref } from "vue";
import AppLayout from "@/layouts/AppLayout.vue";
import { RouterLink } from "vue-router";
import useContacts from "@/composables/contacts";


const { contacts, all, destroy } = useContacts()

onMounted(() => {
    all()
})
</script>

<template>
    <AppLayout>
        <div class="px-4 sm:px-6 lg:px-8">
            <div class="-mx-4 sm:-mx-0">
                <table class="min-w-full divide-y divide-gray-300">
                    <thead>
                        <tr>
                            <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                Contact Name
                            </th>
                            <th scope="col"
                                class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                                Phone Number
                            </th>
                            <th scope="col"
                                class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                                Added By
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Date Added
                            </th>
                            <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                <RouterLink
                                    :to="{
                                        name: 'contacts.create'
                                    }"
                                    class="block w-2/3 mx-auto rounded-full bg-indigo-600 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    +
                                </RouterLink>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="contact in contacts.data" :key="contact.id">
                            <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                {{ contact.name }}
                            </td>
                            <td class="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                                {{ contact.phone_number }}
                            </td>
                            <td class="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                                {{ contact.creator_name }}
                            </td>
                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {{ contact.updated_at }}
                            </td>
                            <td class="whitespace-nowrap py-4 text-sm text-gray-500 text-center flex justify-center gap-x-6">
                                <RouterLink
                                    :to="{
                                        name: 'contacts.edit',
                                        params: {
                                            'id': contact.id
                                        }
                                    }" class="text-indigo-600 hover:text-indigo-900">
                                    Edit
                                </RouterLink>

                                <form @submit.prevent="destroy(contact.id)">
                                    <button
                                        type="submit"
                                        class="text-red-500"
                                    >
                                        Delete
                                    </button>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </AppLayout>
</template>