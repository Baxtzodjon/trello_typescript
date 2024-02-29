import axios from 'axios'
const base = import.meta.env.VITE_BASE_URL

export const getData = async (path: string) => {
    try {
        const res = await axios.get(base + path)

        return res
    } catch(e) {
        alert('Network error')
    }
}

export const postData = async (path: string, body: object) => {
    try {
        const res = await axios.post(base + path, body)

        return res
    } catch(e) {
        alert('Network error')
    }
}

export const patchData = async (path: string, body: object) => {
    try {
        const res = await axios.patch(base + path, body)

        return res
    } catch(e) {
        alert('Network error')
    }
}

export const deleteData = async (path: string) => {
    try {
        const res = await axios.delete(base + path)

        return res
    } catch(e) {
        alert('Network error')
    }
}