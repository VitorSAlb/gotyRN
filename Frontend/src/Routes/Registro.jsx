import React, {useState} from 'react'

import Footer from '../Components/Footer'
import Header from '../Components/Header'

import "../Styles/base.css"
import "../Styles/forms.css"

function Registro() {
  const [novoUsuario, setNovoUsuario] = useState({
    UsuarioNome: "",
    Username: "",
    UsuarioEmail: "",
    UsuarioSenha: "",
    DataDeNascimento: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoUsuario({ ...novoUsuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se algum campo está vazio
    const camposVazios = Object.values(novoUsuario).some(value => value === "");
    if (camposVazios) {
      alert('Por favor, preencha todos os campos antes de enviar o formulário.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoUsuario),
      });

      if (response.ok) {
        console.log('Usuario adicionado com sucesso!');
        alert('Usuario adicionado com sucesso!');
      } else {
        console.error('Erro ao adicionar o Usuario:', response.statusText);
        alert('Erro ao adicionar o Usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar o Usuario:', error.message);
      alert('Erro ao adicionar o Usuario:', error.message);
    }
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
              
              <input className="input-lr" type="text" name="UsuarioNome" value={novoUsuario.UsuarioNome} onChange={handleInputChange} placeholder="Digite seu nome completo" />

              
              <input className="input-lr" type="text" name="Username" value={novoUsuario.Username} placeholder="Escolha um nome de usuário" onChange={handleInputChange}/>

              
              <input className="input-lr" type="email" name="UsuarioEmail" value={novoUsuario.UsuarioEmail} placeholder="Digite seu endereço de email" onChange={handleInputChange}/>

              
              <input className="input-lr" type="password" name="UsuarioSenha" value={novoUsuario.UsuarioSenha} placeholder="Digite sua senha" onChange={handleInputChange}/>

              
              <input className="input-lr" type="date" name="DataDeNascimento" value={novoUsuario.DataDeNascimento} placeholder="Selecione sua data de nascimento" onChange={handleInputChange}/>

              <button className='btn-reg-lr' href="/UserPG" type="button" onClick={handleSubmit}>Registre-se</button>
              <label><a href="/Login">Login</a></label>
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
