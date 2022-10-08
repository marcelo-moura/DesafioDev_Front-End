import React from "react";
import { Link } from "react-router-dom"
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi'

import './styles.css'

export default function Produtos() {
    return (
        <div className="produto-container">
            <header>
                {/* <img src={logoImage} alt="Produtos" /> */}
                <span>Bem-vindo, <strong>Marcelo</strong>!</span>
                <Link className="button" to="/produto/novo">Novo Produto</Link>
                <button type="button">
                    <FiPower size={18} color="#251FC5" />
                </button>
            </header>

            <h1>Produtos</h1>
            <ul>
                <li>
                    <strong>Nome:</strong>
                    <p>Test</p>
                    <strong>Descrição:</strong>
                    <p>Test</p>
                    <strong>Preço:</strong>
                    <p>Test</p>
                    <strong>Quantidade:</strong>
                    <p>Test</p>                    

                    <button type="button">
                        <FiEdit size={20} color="#251FC5"/>
                    </button>
                    <button type="button">
                        <FiTrash2 size={20} color="#251FC5"/>
                    </button>                   
                </li>
            </ul>
        </div>
    );
}