import React from "react";
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements';
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa';

import api from "../../services/api";

export default function Navbar() {
    const nomeUsuario = localStorage.getItem('nomeUsuario');

    const navigate = useNavigate();

    async function deslogar() {
        try {
            await api.get('api/v1/Auth/revoke');
            localStorage.clear();
            navigate('/signin');
        } catch (error) {
            alert(error.response.data.errors);
        }
    }

    return (                        
        <Nav>            
        <Bars />  
        <NavMenu>
            <NavLink to='/home'>
                Home
            </NavLink>
            <NavLink to='/produtos'>
                Produtos
            </NavLink> 
            <NavLink to='/carrinho'>
                <FaShoppingCart size={20}></FaShoppingCart>
            </NavLink> 
        </NavMenu>
       
       {
        nomeUsuario !== null ? <NavBtn>
                                   <span>Bem-vindo, <strong>{nomeUsuario}</strong>!</span>
                                   <NavBtnLink onClick={deslogar}>Sign Out</NavBtnLink>            
                               </NavBtn> 
                               :
                               <NavBtn>
                                   <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                               </NavBtn>   
       }
            
      </Nav>
    );
}