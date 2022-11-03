import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from './components/Navbar';

import Login from "./pages/Login";
import Produtos from "./pages/Produtos";
import NovoProduto from "./pages/NovoProduto";
import EditaProduto from "./pages/EditaProduto";
import Home from "./pages/Home";
import DetalheProduto from "./pages/DetalheProduto";
import Carrinho from "./pages/Carrinho";

export default function Rotas() {
    return (
        <BrowserRouter>
        <Navbar/>
            <Routes>
                <Route path="/" exact element={<Home/>} />
                <Route path="/home" element={<Home/>} />
                <Route path="/home/detalhe/:produtoId" element={<DetalheProduto/>} />
                <Route path="/carrinho" element={<Carrinho/>} />
                <Route path="/signin" element={<Login/>} />
                <Route path="/produtos" element={<Produtos/>} />
                <Route path="/produto/novo" element={<NovoProduto/>} />
                <Route path="/produto/editar/:produtoId" element={<EditaProduto/>} />
            </Routes>
        </BrowserRouter>
    );
} 