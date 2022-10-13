import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import './styles.css'

export default function NovoProduto() {

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState('');

    const codigoUsuario = localStorage.getItem('codigoUsuario');
    const nomeUsuario = localStorage.getItem('nomeUsuario');

    const navigate = useNavigate();

    async function criarProduto(e){
        e.preventDefault();

        const data = {
            nome,
            descricao,
            preco,
            quantidade,
            codigoUsuario,
            nomeUsuario
        };

        const accessToken = localStorage.getItem('accessToken');

        try {
            const response = await api.post('api/v1/Produto', data, {
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            });
            
        } catch (error) {
            alert(error.response.data.erros)
        }

        navigate('/produtos');

    }

    return (
        <div className="novo-produto-container">
            <div className="content">
                <section className="form">
                    {/* <img src={logoImage} alt="NovoProduto" /> */}
                    <h1>Novo Produto</h1>
                    <p>Insira as informações do produto e clique em Adicionar</p>
                    <Link className="back-link" to="/produtos">
                        <FiArrowLeft size={16} color="#251FC65"/>
                        Home
                    </Link>
                </section>
                <form onSubmit={criarProduto}>
                    <input 
                        placeholder="Nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />

                    <input 
                        placeholder="Descrição"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />

                    <input 
                        placeholder="Preço"
                        value={preco}
                        onChange={e => setPreco(e.target.value)}
                    />

                    <input 
                        placeholder="Quantidade"
                        value={quantidade}
                        onChange={e => setQuantidade(e.target.value)}
                    />

                    <button type="submit" className="button">Adicionar</button>
                </form>
            </div>
        </div>
    );
}