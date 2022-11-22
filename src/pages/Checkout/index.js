import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InnerHTML from 'dangerously-set-html-content'

import { iniciarPedidoCliente } from "../../services/carrinhoService";
import './styles.css';
import { FormMercadoPago } from "../../MercadoPago/formMercadoPago";

export default function Checkout() {
    const keyMercadoPago = process.env.REACT_APP_MERCADOPAGO_KEY;

    const carrinhoResponse = JSON.parse(localStorage.getItem('carrinho'));  
    const [carrinho, setCarrinho] = useState('');
    const [produtosCarrinho, setProdutosCarrinho] = useState([]);

    const loginUsuario = localStorage.getItem('login');
    const token = localStorage.getItem('accessToken'); 

    const amount = carrinhoResponse == null ? '0' : carrinhoResponse.valorTotal;
    const htmlMercadoPago = FormMercadoPago.replace('{0}', keyMercadoPago).replace('{1}', amount);

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
            if(carrinhoResponse) {
                setCarrinho(carrinhoResponse);           
                setProdutosCarrinho(carrinhoResponse.items);    
            }
            else {                 
                navigate('/carrinho');
            }      
        }
    }

    async function iniciarPedido(e) {
        e.preventDefault();
        const dadosPagamento = JSON.parse(localStorage.getItem('dadosPagamento'));

        var cardholderName =  document.getElementById('form-checkout__cardholderName').value;
        var cardNumber = document.getElementById('form-checkout__cardNumber').value;
        var cardExpirationDate= document.getElementById('form-checkout__cardExpirationDate').value;
        var securityCode = document.getElementById('form-checkout__securityCode').value;

        const data = {
            pedidoId: carrinho.pedidoId,
            clienteId: carrinho.usuarioId,
            clienteLogin: loginUsuario,
            valorTotal: carrinho.valorTotal,
            items: carrinho.items,
            pagamento: {
                nomeCartao: cardholderName,
                numeroCartao: cardNumber,
                expiracaoCartao: cardExpirationDate,
                cvvCartao: securityCode,
                parcelas: dadosPagamento.installments,
                tokenCard: dadosPagamento.token,
                paymentMethodId: dadosPagamento.paymentMethodId
            }     
        }

        try {
            const response = await iniciarPedidoCliente(data);  
            if(response.data.success) {
                localStorage.removeItem('carrinho');
                localStorage.removeItem('dadosPagamento');
                navigate('/confirmacao');
            }            
        } catch (error) {
            alert(error.response.data.erros);
        }
    }
    
    return (
        <div className="checkout-container">       
            <div className="content">  
                <section>
                    <section className="checkout-container-sectionPagamento">                    
                        <h3>Entre com as informações e prossiga com o pedido</h3>
                        <InnerHTML html={htmlMercadoPago} />
                        <form id="form-checkout" onSubmit={iniciarPedido}>
                            <div className="form-checkout_inline">
                                <input type="text" name="cardNumber" id="form-checkout__cardNumber" />
                                <select name="issuer" id="form-checkout__issuer" className="form-checkout-selectIssuer" disabled></select>
                            </div>
                            <input type="text" name="cardholderName" id="form-checkout__cardholderName"/>
                            <div className="form-checkout_inline">
                                <input type="text" name="cardExpirationDate" id="form-checkout__cardExpirationDate" />
                                <input type="text" name="securityCode" id="form-checkout__securityCode" className="form-checkout-inputCvv"/>
                            </div>  
                            <select name="installments" id="form-checkout__installments"></select>
                            <div className="form-checkout_inline">
                                <select name="identificationType" id="form-checkout__identificationType" className="form-checkout-selectIdentification"></select>
                                <input type="text" name="identificationNumber" id="form-checkout__identificationNumber" className="form-checkout-inputIdentification"/>
                            </div>  
                            <button type="submit" id="form-checkout__submit" className="button">Iniciar Pedido</button>
                        </form>
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