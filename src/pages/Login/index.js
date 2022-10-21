import { React, useState } from "react";
import { useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";

import api from "../../services/api";
import './styles.css';

import logoImage from '../../assets/logo.svg';
import padlock from '../../assets/padlock.png';

export default function Login() {

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function logar(e) {
        e.preventDefault();

        const data = {
            login, senha
        };

        try {
            const response = await api.post('/api/v1/Auth/signIn', data);

            var decoded = jwtDecode(response.data.data.accessToken);
            
            localStorage.setItem('login', login);
            localStorage.setItem('codigoUsuario', decoded.sub);
            localStorage.setItem('nomeUsuario', decoded.unique_name);
            localStorage.setItem('accessToken', response.data.data.accessToken);
            localStorage.setItem('refreshToken', response.data.data.refreshToken);

            navigate('/home');
        } catch (error) {
            alert(error.response.data.erros);
        }
    }

    return (
        <div className="login-container">
            <section className="form">
            {/* <img src={logoImage} alt="DesafioDev Logo"/> */}
                <form onSubmit={logar}>
                    <h1>Access your Account</h1>

                    <input 
                        placeholder="Login" 
                        value={login} 
                        onChange={e => setLogin(e.target.value)}
                    />

                    <input 
                        type="password" 
                        placeholder="Senha" 
                        value={senha} 
                        onChange={e => setSenha(e.target.value)}
                    />

                    <button className="button" type="submit">Login</button>
                </form>
            </section>
            {/* <img src={padlock} alt="Login"/> */}
        </div>
    );
}