import { React, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

export default function DetalheProduto() {

    const [id, setId] = useState(null);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState('');

    const codigoUsuario = localStorage.getItem('codigoUsuario');
    const nomeUsuario = localStorage.getItem('nomeUsuario');

    const { produtoId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadProduto();
    }, []);

    async function loadProduto() {
        try {
            const response = await api.get(`api/v1/Produto/${produtoId}`);
            const produto = response.data.data;

            setId(produto.id);
            setNome(produto.nome);
            setDescricao(produto.descricao);
            setPreco(produto.preco);
            setQuantidade(produto.quantidade);
        } catch (error) {
            alert(error.response.data.errors);
            navigate('/home');
        }
    }

    return (
        <h1>{produtoId}</h1>
    );
}