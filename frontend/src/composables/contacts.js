import { ref } from "vue"
import axios from "@/axios.js"
import { useRouter } from "vue-router"

export default function useContacts() {
    const contacts = ref([])
    const contact = ref([])
    const errors = ref([])
    const router = useRouter()

    const all = async () => {
        const response = await axios.get("/api/contacts")
        
        contacts.value = response.data.contacts
    }

    const get = async (id) => {
        const response = await axios.get(`/api/contacts/${id}`)
        
        contact.value = response.data.contact
    }

    const store = async (data) => {
        try {
            await axios.post("/api/contacts", data)
            
            router.push({
                name: "contacts.index"
            })
        } catch (error) {
            if(error.response.status === 422) {
                errors.value = error.response.data.errors
            }
        }
    }

    const update = async (id, data) => {
        try {
            await axios.patch(`/api/contacts/${id}`, contact.value)
            
            router.push({
                name: "contacts.index"
            })
        } catch (error) {
            if(error.response.status === 422) {
                errors.value = error.response.data.errors
            }
        }
    }

    const destroy = async (id) => {
        if (!window.confirm('Are you sure?')) {
            return
        }

        await axios.delete(`/api/contacts/${id}`)

        await all()
    }

    return {
        contact,
        contacts,
        errors,
        all,
        get,
        store,
        update,
        destroy
    }
}