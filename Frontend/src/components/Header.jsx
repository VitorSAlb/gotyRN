
import "../Styles/Header.css";
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [activeUser, setActiveUser] = useState(null);

  const toggleMenu = () => {
    setMenuVisibility(!isMenuVisible);
  };

  useEffect(() => {
    // Função para obter todos os jogos
    const verificarUsuarioAtivo = async () => {
      try {
        const response = await fetch('http://localhost:3000/verificarUsuario');
        const data = await response.json();
        setActiveUser(data);
      } else {
        setActiveUser(null);
      }
    } catch (error) {
      console.error('Erro ao obter usuário ativo:', error.message);
    }
  };

  useEffect(() => {
    // Busca o usuário ativo inicialmente
    fetchActiveUser();

    // Configura um intervalo para buscar o usuário ativo a cada 5 segundos (ajuste conforme necessário)
    const intervalId = setInterval(fetchActiveUser, 5000);

    // Limpa o intervalo ao desmontar o componente para evitar vazamentos de memória
    return () => clearInterval(intervalId);
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
        // Exemplo de redirecionamento para a página de login (ajuste conforme sua estrutura de rotas)
        window.location.href = '/';
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

        {/* Lista de usuário */}
        <ul className="user-log">
          {activeUser ? (
            <>
              <li><a href={`/user/${activeUser.UsuarioNome}`}>{`Bem-vindo, ${activeUser.UsuarioNome}`}</a></li>
              <li className="barra-ul">|</li>
              <li><a onClick={handleLogout}>Sair</a></li>
            </>
          ) : (
            <>
              <li><a href="/registro">Registre-se</a></li>
              <li className="barra-ul">|</li>
              <li><a href="/login">Login</a></li>
            </>
          )}
        </ul>


      </nav>
    </header>
  );
};

export default Header;
