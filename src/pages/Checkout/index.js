import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import './styles.css';

export default function Checkout() {
    const urlFormMercadoPago = `${process.env.REACT_APP_FRONT_BASE_URL}/formMercadoPago/index.html`;

    const [carrinho, setCarrinho] = useState('');
    const [produtosCarrinho, setProdutosCarrinho] = useState([]);

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
            const carrinho = JSON.parse(localStorage.getItem('carrinho'));             
            if(carrinho) {
                setCarrinho(carrinho);           
                setProdutosCarrinho(carrinho.items);    
            }
            else {                 
                navigate('/carrinho');
            }      
        }
    }
    
    return (
        <div className="checkout-container">       
            <div className="content">  
                <section>
                    <section className="checkout-container-sectionPagamento">                    
                        <h3>Entre com as informações e prossiga com o pedido</h3>
                        <iframe src={urlFormMercadoPago} />
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
                                <span className="checkout-container-totalPrice">
                                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(carrinho.valorTotal)}
                                </span>
                            </div>
                        </div>              
                    </section>
                </section>      
            </div>
        </div>
    );
}