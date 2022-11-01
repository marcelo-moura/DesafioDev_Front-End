import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from 'react-icons/fi';

import api from "../../services/api";
import './styles.css';

export default function Produtos() {

    const [produtos, setProdutos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        api.get('api/v1/Produto/1/20/1/asc').then(response => {
            setProdutos(response.data.data.listObject);
        })
    }, []);

    function editarProduto(id) {
        navigate(`/produto/editar/${id}`);
    }

    async function deletarProduto(id) {
        try {
            await api.delete(`api/v1/Produto/${id}`);
            setProdutos(produtos.filter(produto => produto.id !== id));
        } catch (error) {
            alert(error.response.data.errors);
        }
    }    

    return (
        <div className="produto-container">
            <header>
                {/* <img src={logoImage} alt="Produtos" /> */}
                {
                    localStorage.getItem('accessToken') != null ? <Link className="button" to="/produto/novo">Novo Produto</Link> : ""
                }
                
            </header>
            <ul>
                {produtos.map(produto => (
                     <li key={produto.id}>
                        <strong>Nome:</strong>
                        <p>{produto.nome}</p>
                        
                        <strong>Descrição:</strong>
                        <p>{produto.descricao}</p>
                        
                        <strong>Preço:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(produto.preco)}</p>
                        
                        <strong>Quantidade:</strong>
                        <p>{produto.quantidade}</p>                    
    
                        <button type="button" onClick={() => editarProduto(produto.id)}>
                            <FiEdit size={20} color="#251FC5"/>
                        </button>
                        <button type="button" onClick={() => deletarProduto(produto.id)}>
                            <FiTrash2 size={20} color="#251FC5"/>
                        </button>                   
                    </li>
                ))}
            </ul>
        </div>
    );
}