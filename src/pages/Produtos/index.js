import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi'

import api from "../../services/api";
import './styles.css'

export default function Produtos() {

    const [produtos, setProdutos] = useState([]);

    const codigoUsuario = localStorage.getItem('codigoUsuario');
    const nomeUsuario = localStorage.getItem('nomeUsuario'); 
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    useEffect(() => {
        api.get('api/v1/Produto/1/20/1/asc', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            setProdutos(response.data.data.listObject);
        })
    }, [accessToken]);

    async function deletarProduto(id) {
        try {
            await api.delete(`api/v1/Produto/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            setProdutos(produtos.filter(produto => produto.id !== id));

        } catch (error) {
            alert(error.response.data.errors);
        }
    }

    async function deslogar() {
        try {
            await api.get('api/v1/Auth/revoke', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

           localStorage.clear();
           navigate('/');
        } catch (error) {
            alert(error.response.data.errors);
        }
    }

    return (
        <div className="produto-container">
            <header>
                {/* <img src={logoImage} alt="Produtos" /> */}
                <span>Bem-vindo, <strong>{nomeUsuario.toLowerCase()}</strong>!</span>
                <Link className="button" to="/produto/novo">Novo Produto</Link>
                <button type="button" onClick={deslogar}>
                    <FiPower size={18} color="#251FC5" />
                </button>
            </header>

            <h1>Produtos</h1>
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
    
                        <button type="button">
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