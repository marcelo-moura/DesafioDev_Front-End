import React from "react";

import './styles.css';
import orderpng from "../../assets/order.png" 

export default function Confirmacao() {

    return (
        <div className="confirmacao-container">
            <div className="confirmacao-container-titlePane">
                <h1>Recebemos seu pedido e seu pagamento será processado em breve!</h1>                     
            </div>
            <img src={orderpng} className="confirmacao-container-thumbnail" />   
        </div>  
    );
}