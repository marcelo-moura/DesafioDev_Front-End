import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Produtos from "./pages/Produtos";
import NovoProduto from "./pages/NovoProduto";
import EditaProduto from "./pages/EditaProduto";
import Home from "./pages/Home";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Login/>} />
                <Route path="/produtos" element={<Produtos/>} />
                <Route path="/produto/novo" element={<NovoProduto/>} />
                <Route path="/produto/editar/:produtoId" element={<EditaProduto/>} />
                <Route path="/home" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    );
} 