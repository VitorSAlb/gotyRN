import React, {useState} from 'react'

import Footer from '../Components/Footer'
import Header from '../Components/Header'
// import LoginForm from '../components/LoginForm'
// import InfosUsers from '../Components/InfoUsers'

import "../Styles/base.css"
import "../Styles/forms.css"



function LoginForm() {

        const [UsuarioEmail, setUsuarioEmail] = useState('');
        const [UsuarioSenha, setUsuarioSenha] = useState('');
      
        const handleSubmit = async (e) => {
          e.preventDefault();
      
          try {
            const response = await fetch('http://localhost:3000/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ UsuarioEmail, UsuarioSenha }),
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log(data.mensagem);
              alert(data.mensagem);
              
            } else {
              console.error('Erro ao realizar login:', response.statusText);
              alert('Erro ao realizar login:', response.statusText);
            }
          } catch (error) {
            console.error('Erro ao realizar login:', error.message);
            alert('Erro ao realizar login:', error.message);
          }
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
                            <form onSubmit={handleSubmit} className='login-form-lr' id="loginForm">
                            
                                <input className="input-lr" type="email" 
                                name="email" 
                                placeholder="Digite seu endereço de email" 
                                value = {UsuarioEmail}
                                onChange={(e) => setUsuarioEmail(e.target.value)}
                                />

                                <input className="input-lr" type="password" 
                                name="senha" 
                                value = {UsuarioSenha}
                                placeholder="Digite sua senha" 
                                onChange={(e) => setUsuarioSenha(e.target.value)}
                                />

                                <button className='btn-login-lr'
                                        type="submit">Login</button>
                                <label><a href="/Registro">Registre-se</a></label>
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
