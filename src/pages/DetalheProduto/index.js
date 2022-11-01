import { React, useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";
import './styles.css';
import padlock from "../../assets/padlock.png"

export default function DetalheProduto() {

    const [id, setId] = useState(null);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState(0);

    const codigoUsuario = localStorage.getItem('codigoUsuario');
    const nomeUsuario = localStorage.getItem('nomeUsuario');

    const { produtoId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadProduto();
    }, []);

    async function loadProduto() {
        try {
            const response = await api.get(`api/v1/Vitrine/${produtoId}`);
            const produto = response.data.data;

            setId(produto.id);
            setNome(produto.nome);
            setDescricao(produto.descricao);
            setPreco(produto.preco);
        } catch (error) {
            alert(error.response.data.errors);
            navigate('/home');
        }
    }

    async function adicionarCarrinho(e) {
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
        console.log(data);
    }

    return (
        <div className="detalhe-produto-container">
            <div className="content">
                <form onSubmit={adicionarCarrinho}>
                    <div className="detalhe-produto-container-header">
                        <div className="detalhe-produto-container-titlePane detalhe-produto-container-quebraLinhaTexto">
                            {nome}
                        </div>
                        <div className="detalhe-produto-container-pricePane">
                            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(preco)}
                        </div> 
                    </div>
                    <hr />
                    <div className="detalhe-produto-container-body">
                        <img className="detalhe-produto-container-thumbnail" src={padlock}></img>
                        <section>
                            <div className="detalhe-produto-container-description">
                                <p className="detalhe-produto-container-quebraLinhaTexto">
                                    {descricao.length <= 1100 ? descricao : descricao.substring(0, 1100)}
                                </p>                                                         
                            </div>  
                            <div className="detalhe-produto-container-quantity">
                                <input 
                                    placeholder="Quantidade"
                                    value={quantidade}
                                    onChange={e => setQuantidade(e.target.value)}
                                />
                            </div>    
                        </section>                                           
                    </div>
                    <hr/>
                    <div className="detalhe-produto-container-footer">
                        <Link className="button" to="/home">
                            Voltar
                        </Link>
                        <button type="submit" className="button">Adicionar ao Carrinho</button>
                    </div>
                </form>
            </div>
        </div>
    );
}