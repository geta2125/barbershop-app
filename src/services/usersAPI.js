import axios from "axios";

const API_URL = "https://vmhtbwzpfwsutkjrhukw.supabase.co/rest/v1/users";

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtaHRid3pwZndzdXRranJodWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0MDMwMTYsImV4cCI6MjA5Njk3OTAxNn0.kEOrXCFvu_SIqw978rhAKdJgS-wP5ZoIuqfrWBom858";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Accept: "application/json",
};

export const usersAPI = {

    // ======================
    // GET ALL USERS
    // ======================
    async fetchUsers() {
        const response = await axios.get(
            API_URL,
            { headers }
        );

        return response.data;
    },

    // ======================
    // CREATE USER
    // ======================
    async createUser(data) {

        const response = await axios.post(
            API_URL,
            {
                nama: data.nama,
                email: data.email,
                password: data.password,
                role: data.role,
                status: data.status,
            },
            {
                headers: {
                    ...headers,
                    Prefer: "return=representation",
                },
            }
        );

        return response.data;
    },

    // ======================
    // REGISTER USER
    // ======================
    async register(data) {

        const cekUser = await axios.get(
            `${API_URL}?email=eq.${data.email}`,
            { headers }
        );

        if (cekUser.data.length > 0) {
            throw new Error("Email sudah terdaftar");
        }

        const response = await axios.post(
            API_URL,
            {
                nama: data.nama,
                email: data.email,
                password: data.password,
                role: data.role,
                status: "Aktif",
            },
            {
                headers: {
                    ...headers,
                    Prefer: "return=representation",
                },
            }
        );

        return response.data[0];
    },

    // ======================
    // LOGIN
    // ======================
    async login(email, password) {

        const response = await axios.get(
            `${API_URL}?email=eq.${email}`,
            { headers }
        );

        const user = response.data[0];

        if (!user) {
            throw new Error("Email tidak ditemukan");
        }

        if (user.password !== password) {
            throw new Error("Password salah");
        }

        return user;
    },

    // ======================
    // UPDATE USER
    // ======================
    async updateUser(id, data) {

        const response = await axios.patch(
            `${API_URL}?id=eq.${id}`,
            data,
            {
                headers: {
                    ...headers,
                    Prefer: "return=representation",
                },
            }
        );

        return response.data;
    },

    // ======================
    // DELETE USER
    // ======================
    async deleteUser(id) {

        await axios.delete(
            `${API_URL}?id=eq.${id}`,
            { headers }
        );

        return true;
    },
};