import { React, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { getProduto, updateProduto } from "../../services/produtoService";
import './styles.css';

export default function EditaProduto() {
    
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
            const response = await getProduto(produtoId);
            const produto = response.data.data;

            setId(produto.id);
            setNome(produto.nome);
            setDescricao(produto.descricao);
            setPreco(produto.preco);
            setQuantidade(produto.quantidade);
        } catch (error) {
            alert(error.response.data.errors);
            navigate('/produtos');
        }
    }

    async function editarProduto(e) {
        e.preventDefault();

        const data = {
            id,
            nome,
            descricao,
            preco,
            quantidade,
            codigoUsuario,
            nomeUsuario
        };

        try {
            await updateProduto(data);
        } catch (error) {
            alert(error.response.data.errors);
        }
    }
    
    return (
        <div className="edit-produto-container">
            <div className="content">
                <section className="form">
                    {/* <img src={logoImage} alt="NovoProduto" /> */}
                    <h1>Editar Produto</h1>
                    <p>Insira as informações do produto e clique em Editar</p>
                    <Link className="back-link" to="/produtos">
                        <FiArrowLeft size={16} color="#251FC65"/>
                        Voltar
                    </Link>
                </section>
                <form onSubmit={editarProduto}>
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

                    <button type="submit" className="button">Editar</button>
                </form>
            </div>
        </div>
    );
}