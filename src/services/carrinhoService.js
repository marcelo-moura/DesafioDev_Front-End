import api from "./api";

export async function getCarrinho(idUsuario) {
    return await api.get(`api/v1/Carrinho/meu-carrinho?clienteId=${idUsuario}`);
}

export async function adicionarItemCarrinho(data) {
    return await api.post('api/v1/Carrinho/adicionar-item', data);
}

export async function iniciarPedidoCliente(data) {
    return await api.post('api/v1/Carrinho/iniciar-pedido', data);
}