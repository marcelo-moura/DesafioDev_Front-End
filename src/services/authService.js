import api from "./api";

export async function signin(data) {
    return await api.post('api/v1/Auth/signIn', data);
}

export async function logout() {
    return await api.get('api/v1/Auth/revoke');
}