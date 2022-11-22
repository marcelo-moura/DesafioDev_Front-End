import api from "./api";

export async function getProduto(id) {
    return await api.get(`api/v1/Produto/${id}`);    
}

export async function getProdutos(page = 1, pageSize = 20, sortOrder = 1, sortDirection = 'asc', filter = '') {
    return await api.get(`api/v1/Produto/${page}/${pageSize}/${sortOrder}/${sortDirection}?${filter}`);    
}

export async function createProduto(data) {
    return await api.post('api/v1/Produto', data);
}

export async function updateProduto(data) {
    return await api.put('api/v1/Produto', data);
}

export async function deleteProduto(id) {
    return await api.delete(`api/v1/Produto/${id}`);
}