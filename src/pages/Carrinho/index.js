import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2 } from 'react-icons/fi';

import api from "../../services/api";
import './styles.css';
import padlock from "../../assets/padlock.png"

export default function Carrinho() {
    const idUsuario = localStorage.getItem('id');
    const token = localStorage.getItem('accessToken');

    const [carrinho, setCarrinho] = useState('');
    const [produtosCarrinho, setProdutosCarrinho] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        loadCarrinho();
    }, []);

    async function loadCarrinho() {
        if(!token){
            alert('Para visualizar os itens no carrinho é necessário realizar o Login.');
            navigate('/signin');
        }
        else {
            try {
                const response = await api.get(`api/v1/Carrinho/meu-carrinho?clienteId=${idUsuario}`);  
                if(response.data.data) {
                    setCarrinho(response.data.data);
                    setProdutosCarrinho(response.data.data.items);
                }
                else {
                    navigate('/home');
                }                
            } catch (error) {
                alert(error.response.data.errors);
                navigate('/home');
            }
        }
    }

    function continuarCompra() {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        navigate('/checkout');
    }

    async function deletarProduto(id) {     
    } 

    return (
        <div className="carrinho-container">            
            <div className="carrinho-container-header">
                <span>Total:</span>
                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(carrinho.valorTotal)}</p>
            </div>     
            <hr/>        
            <ul>
                {produtosCarrinho.map(produto => (
                     <li key={produto.produtoId}>
                        <img className="carrinho-container-thumbnail" src={padlock}></img>
                        <section>
                            <div className="carrinho-container-name">
                                <p>{produto.nomeProduto}</p>                                
                            </div>
                            <div className="carrinho-container-price">
                                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(produto.valorUnitario)}</p>
                            </div>                            
                            <div className="carrinho-container-quantity">
                                <p>{produto.quantidade}</p>
                            </div>                       
                        </section>
                        <button type="button" onClick={() => deletarProduto(produto.produtoId)}>
                            <FiTrash2 size={20} color="#251FC5"/>
                        </button>                   
                    </li>
                ))}
            </ul>
            <hr/>
            <div className="carrinho-container-footer">
                <Link className="button" to="/home">
                    Voltar
                </Link>
                <button type="button" className="button" onClick={() => continuarCompra()}>
                    Continuar Compra
                </button>
            </div>
        </div>        
    );
}