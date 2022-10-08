import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import NovoProduto from "./pages/NovoProduto";
import Produtos from "./pages/Produtos";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Login/>} />
                <Route path="/produtos" element={<Produtos/>} />
                <Route path="/produto/novo" element={<NovoProduto/>} />
            </Routes>
        </BrowserRouter>
    );
} 