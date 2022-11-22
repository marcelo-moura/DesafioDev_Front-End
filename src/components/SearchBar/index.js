import { React, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

import { getProdutosVitrine } from "../../services/vitrineService";
import './styles.css';

export function SearchBar(props) {
    const [paramProduto, setParamProduto] = useState('');
    const [paramCategoria, setParamCategoria] = useState('');
    const [paramPreco, setParamPreco] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();
    
    async function handleOnSubmit(e) {
        e.preventDefault();

        searchParams.set('nome', paramProduto);
        searchParams.set('nomeCategoria', paramCategoria);
        searchParams.set('preco', paramPreco);

        setSearchParams({
            nome: paramProduto,
            nomeCategoria: paramCategoria,
            preco: paramPreco
        });
        
        var filter = '';
        for (const entry of searchParams.entries()) {
            const [param, value] = entry;
            filter += `${param}=${value}&`;
        }

        try {
            const response = await getProdutosVitrine(1, 20, 1, 'asc', filter);          
            const produtos = response.data.data.listObject;
            props.setProdutos(produtos);
        } catch (error) {
            alert(error.response.data.errors);
        }
    }

    return (
        <div className="searchbar-container">
            <form onSubmit={handleOnSubmit}>
                <div className="searchbar-container-row">
                    <div className="searchbar-container-row-inputIcon">
                        <input
                            placeholder="Buscar produto"   
                            value={paramProduto}
                            onChange={e => setParamProduto(e.target.value)}
                        />                        
                        <button className="searchbar-container-row-Icon"
                                type="submit" >
                            <FiSearch size={35} color="#251FC5" />
                        </button>                       
                    </div>
                    <div className="searchbar-container-row-filters">
                        <select
                            onChange={e => setParamCategoria(e.target.value)} > 
                            <option value="">Categorias</option>
                            <option value="Informática">Informática</option>
                        </select> 
                        <input
                            placeholder="Preço"
                            value={paramPreco}
                            onChange={e => setParamPreco(e.target.value)}                                                       
                        />                       
                    </div>
                </div>
            </form>
        </div>
    );
}