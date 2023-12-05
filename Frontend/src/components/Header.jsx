import "../Styles/Header.css";
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [activeUser, setActiveUser] = useState(null); // Estado para armazenar o nome do usuário

  const toggleMenu = () => {
    setMenuVisibility(!isMenuVisible);
  };

  const updateMenuVisibility = () => {
    const listaNav = document.querySelector('.menu-nav');
    const listaUser = document.querySelector('.user-log');

    // Verifica o tamanho da tela e atualiza a visibilidade do menu
    if (window.innerWidth <= 1200) {
      listaNav.style.display = 'none';
      listaUser.style.display = 'none';
    } else {
      listaNav.style.display = 'flex';
      listaUser.style.display = 'flex';
    }
  };

  useEffect(() => {
    // Simulação de uma chamada à API para obter o nome do usuário ativo
    // Substitua isso pela lógica real de chamada à API do seu backend
    // Aqui você deve obter o nome do usuário ativo do seu backend
    // e definir o estado activeUser com esse nome de usuário.
    // Exemplo fictício:
    // fetch('/api/getActiveUser')
    //   .then(response => response.json())
    //   .then(data => setActiveUser(data.username));

    // Simulação de atualização periódica do usuário a cada 5 segundos
    const interval = setInterval(() => {
      // Lógica de chamada à API aqui para obter o nome do usuário ativo
      // Substitua isso pela lógica real de chamada à API do seu backend
      // e atualize o estado activeUser com o nome de usuário ativo.
    }, 5000);

    // Adiciona evento de redimensionamento da janela
    window.addEventListener('resize', updateMenuVisibility);

    // Cleanup do evento quando o componente é desmontado
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateMenuVisibility);
    };
  }, []); // Certifique-se de fornecer um array vazio para evitar efeitos colaterais

  const createMenuItem = (text, href) => (
    <li>
      <a href={href}>{text}</a>
    </li>
  );

  return (
    <header>
      <nav>
        {/* Logo */}
        <a href="/home">
          <img src="../../public/GOTY-logo.svg" alt="Logo do site Game Of The Year" />
        </a>

        {/* Lista de navegação */}
        <ul className="menu-nav">
          {createMenuItem('Home', '/')}
          {createMenuItem('Jogos', '/jogos')}
          {createMenuItem('Pesquisar', '/src/pages/pesquisa.html')}
          {createMenuItem('CRUD', '/crudJogos')}
        </ul>

        {/* Menu */}
        <div className="menu-icon" id="menuNav" onClick={toggleMenu}>
          ☰
        </div>

        {/* Lista de usuário */}
        <ul className="user-log">
          {activeUser ? (
            <>
              <li>{`Bem-vindo, ${activeUser}`}</li>
              <li className="barra-ul">|</li>
              <li>Sair</li>
            </>
          ) : (
            <>
              {createMenuItem('Registre-se', '/registro')}
              <li className="barra-ul">|</li>
              {createMenuItem('Login', '/login')}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
