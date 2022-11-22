import api from "./api";

export async function getProdutoVitrine(id) {
    return await api.get(`api/v1/Vitrine/${id}`);    
}

export async function getProdutosVitrine(page = 1, pageSize = 20, sortOrder = 1, sortDirection = 'asc', filter = '') {
    return await api.get(`api/v1/Vitrine/${page}/${pageSize}/${sortOrder}/${sortDirection}?${filter}`);    
}