import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import './styles.css';

export default function Checkout() {
    const [nomeCartao, setNomeCartao] = useState('');
    const [numeroCartao, setNumeroCartao] = useState('');
    const [validadeCartao, setValidadeCartao] = useState('');
    const [cvvCartao, setCvvCartao] = useState('');

    const [carrinho, setCarrinho] = useState('');
    const [produtosCarrinho, setProdutosCarrinho] = useState([]);

    const idUsuario = localStorage.getItem('id');
    const codigoUsuario = localStorage.getItem('codigoUsuario');
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const token = localStorage.getItem('accessToken'); 
    
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
                setCarrinho(response.data.data);
                setProdutosCarrinho(response.data.data.items);
            } catch (error) {
                alert(error.response.data.errors);
                navigate('/home');
            }
        }
    }

    async function iniciarPedido(e) {
        e.preventDefault();
    }
    
    return (
        <div className="checkout-container">       
            <div className="content">      
                <form onSubmit={iniciarPedido}>
                    <section className="checkout-container-sectionPagamento">
                        <h3>Entre com as informações e prossiga com o pedido</h3>
                        <input 
                            placeholder="Nome Cartao"
                            value={nomeCartao}
                            onChange={e => setNomeCartao(e.target.value)}
                        />
                        <input 
                            placeholder="Numero Cartao"
                            value={numeroCartao}
                            onChange={e => setNumeroCartao(e.target.value)}
                        />
                        <input 
                            placeholder="Validade Cartao"
                            value={validadeCartao}
                            onChange={e => setValidadeCartao(e.target.value)}
                        />
                        <input                                            
                            placeholder="CVV"
                            value={cvvCartao}
                            onChange={e => setCvvCartao(e.target.value)}
                        />
                    </section>
                    
                    <section className="checkout-container-sectionCarrinho">
                        <div className="checkout-container-dadosCarrinho">
                            <div className="checkout-container-header">
                                <div className="checkout-container-headerName">
                                    <p>Detalhes Produto</p>
                                </div>                                
                                <div className="checkout-container-headerQuantity">
                                    <p>Quantidade</p>
                                </div>
                                <div className="checkout-container-headerPrice">
                                    <p>Preço</p>
                                </div>
                            </div>
                            <hr/>
                            {produtosCarrinho.map(produto => (
                                <div key={produto.produtoId}>
                                    <div className="checkout-container-name">
                                        <p>{produto.nomeProduto}</p>                                
                                    </div>
                                    <div className="checkout-container-quantity">
                                        <p>{produto.quantidade}</p>
                                    </div>   
                                    <div className="checkout-container-price">
                                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(produto.valorUnitario)}</p>
                                    </div>                                           
                                </div>
                            ))}
                            <hr/>
                            <div className="checkout-container-footer">
                                <span>Total</span>
                                <span className="checkout-container-totalPrice">{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(carrinho.valorTotal)}</span>
                            </div>
                            <button type="submit" className="button">Iniciar Pedido</button>
                        </div>              
                    </section>
                </form>
                
            </div>
        </div>
    );
}