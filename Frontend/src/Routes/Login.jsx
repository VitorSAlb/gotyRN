import React from 'react'

import Footer from '../Components/Footer'
import Header from '../Components/Header'
// import LoginForm from '../components/LoginForm'
// import InfosUsers from '../Components/InfoUsers'

import "../Styles/base.css"
import "../Styles/forms.css"



function LoginForm() {

    const handleLogin = (e) => {

      };


    return (
        <>
            <Header />
            <main>
                <div className="tittle-banner">
                    <h3>Login</h3>
                </div>
                    <div className="all-container-lr">
                        <div className="container-forms-lr">
                            <form className='login-form-lr' id="loginForm">
                                <label htmlFor="email"></label>
                                <input className="input-lr" type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Digite seu endereço de email" 
                                required 
                                onChange={(e) => setEmail(e.target.value)}
                                />

                                <label htmlFor="senha"></label>
                                <input className="input-lr" type="password" 
                                id="senha" 
                                name="senha" 
                                placeholder="Digite sua senha" 
                                required 
                                onChange={(e) => setPassword(e.target.value)}
                                />

                                <button type="button" className='btn-login-lr'
                                        onClick={(e) => handleLogin(e)}>Login</button>
                                <label><a href="/src/pages/registro.html">Registre-se</a></label>
                            </form>
                        </div>
                        <hr />
                        <div className="infos-users-lr">
                        <h1>Com uma conta, você pode:</h1>
                        <ul>
                            <li>
                                <h3>Dar nota aos Jogos</h3>
                            </li>
                            <li>
                                <h3>Ter um perfil próprio</h3>
                            </li>
                            <li>
                                <h3>Ver seu progresso em jogos</h3>
                            </li>
                            <li>
                                <h3>Adicionar novos jogos</h3>
                            </li>
                            <li>
                                <h3>Adicionar novas plataformas</h3>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
    };

export default LoginForm;
