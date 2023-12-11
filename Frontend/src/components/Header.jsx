import "../Styles/Header.css";
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [activeUser, setActiveUser] = useState(null); // Estado para armazenar o nome do usuário

  const toggleMenu = () => {
    setMenuVisibility(!isMenuVisible);
  };

  useEffect(() => {
    const verificarUsuarioAtivo = async () => {
      try {
        const response = await fetch('http://localhost:3000/verificarUsuario');
        const data = await response.json();
        setActiveUser(data);
        console.log(data)
      } catch (error) {
        console.error('Erro ao obter jogos:', error.message);
      }
    };

    verificarUsuarioAtivo();
  }, []);

  const createMenuItem = (text, href) => (
    <li>
      <a href={href}>{text}</a>
    </li>
  );

   const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Logout realizado com sucesso!');
      } else {
        console.error('Erro ao realizar logout');
      }
    } catch (error) {
      console.error('Erro ao realizar logout:', error.message);
    }
  };

  return (
    <header>
      <nav>
        <a href="/">
          <img src="../../public/GOTY-logo.svg" alt="Logo do site Game Of The Year" />
        </a>

        <ul className="menu-nav">
          {createMenuItem('Home', '/')}
          {createMenuItem('Jogos', '/jogos')}
          {createMenuItem('Pesquisar', '/jogos/pesquisa')}
          {createMenuItem('CRUD', '/jogos/lista')}
        </ul>

        <div className="menu-icon" id="menuNav" onClick={toggleMenu}>
          ☰
        </div>

        <ul className="user-log">
          {activeUser ? (
            <>
            {createMenuItem('Registre-se', '/registro')}
            <li className="barra-ul">|</li>
            {createMenuItem('Login', '/login')}
          </>
            
          ) : (
          
            <>
                        
            <li><a href="/user/:UsuarioNome">{`Bem-vindo`}</a></li>
            <li className="barra-ul">|</li>
            <li><a onClick={handleLogout}>Sair</a></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
