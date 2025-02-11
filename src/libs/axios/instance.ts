import environment from "@/config/environment";
import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface CustomSession extends Session {
    accessToken?: string;
}

const headers = {
    "Content-Type": "application/json"
}

// Axios Instance
const instance = axios.create({
    baseURL: environment.API_URL,
    headers,
    // Jika terlalu lama backend maka akan timeout
    timeout: 60 * 1000,
});

// Mengecek error
instance.interceptors.request.use(
    async (request) => {
        const session: CustomSession | null = await getSession();
        if(session && session.accessToken) {
            request.headers.Authorization = `Bearer ${session.accessToken}`
        }
        return request;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
)

export default instance;