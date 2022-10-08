import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import './styles.css'

export default function NovoProduto() {
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
                <form>
                    <input placeholder="Nome" />
                    <input placeholder="Descrição" />
                    <input placeholder="Preço" />
                    <input placeholder="Quantidade" />

                    <button type="submit" className="button">Adicionar</button>
                </form>
            </div>
        </div>
    );
}