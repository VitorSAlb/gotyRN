import React from 'react'

import Footer from '../Components/Footer'
import Header from '../Components/Header'

import "../Styles/base.css"
import "../Styles/forms.css"

function Registro() {
    
  const handleRegistration = (e) => {
    // Handle registration logic here
    // You can use React state or any state management library to handle form data
  };

  return (
    <>
      <Header />

      <main>
        <div className="tittle-banner">
          <h3>Registre-se</h3>
        </div>
        <div className="all-container-lr">
          <div className="container-forms-lr">
            <form id="registroForm">
              <label htmlFor="nomeSobrenome"></label>
              <input className="input-lr" type="text" id="nomeSobrenome" name="nomeSobrenome" placeholder="Digite seu nome completo" required />

              <label htmlFor="username"></label>
              <input className="input-lr" type="text" id="username" name="username" placeholder="Escolha um nome de usuário" required />

              <label htmlFor="email"></label>
              <input className="input-lr" type="email" id="email" name="email" placeholder="Digite seu endereço de email" required />

              <label htmlFor="senha"></label>
              <input className="input-lr" type="password" id="senha" name="senha" placeholder="Digite sua senha" required />

              <label htmlFor="dataNascimento"></label>
              <input className="input-lr" type="date" id="dataNascimento" name="dataNascimento" placeholder="Selecione sua data de nascimento" required />

              <button className='btn-reg-lr' type="button" onClick={handleRegistration}>Registre-se</button>
              <label><a href="/src/pages/login.html">Login</a></label>
            </form>
          </div>

          <hr />

          <div className="infos-users-lr">
            <h1>Com uma conta, você pode:</h1>

            <ul>
              <li><h3>Dar nota aos Jogos</h3></li>
              <li><h3>Ter um perfil próprio</h3></li>
              <li><h3>Ver seu progresso em jogos</h3></li>
              <li><h3>Adicionar novos jogos</h3></li>
              <li><h3>Adicionar novas plataformas</h3></li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Registro;
