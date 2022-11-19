import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { SearchBar } from "../../components/SearchBar";
import { getProdutosVitrine } from "../../services/vitrineService";

import './styles.css';
import padlock from '../../assets/padlock.png';

export default function Home() {
    const [produtos, setProdutos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getProdutosVitrine().then(response => {
            setProdutos(response.data.data.listObject);
        });  
    }, []);

    async function detalheProduto(id) {
        navigate(`/home/detalhe/${id}`);
    }

    return (
        <div className="home-container">
            <SearchBar setProdutos={setProdutos} />
            <div className="home-container-listContainer">
                {produtos.map(produto => (
                    <a key={produto.id} className="home-container-itemLink" onClick={() => detalheProduto(produto.id)}>
                        <div className="home-container-item">
                            <img className="home-container-thumbnail" src={padlock}></img>
                                <div className="home-container-titlePane">
                                    {produto.nome}
                                </div>   
                                <div className="home-container-pricePane">
                                    {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(produto.preco)}
                                </div>                                                         
                        </div>
                    </a>
                ))}
            </div>           
        </div>
    );
}