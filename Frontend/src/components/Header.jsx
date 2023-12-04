import "../Styles/Header.css"
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuVisible, setMenuVisibility] = useState(false);

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
    // Adiciona evento de redimensionamento da janela
    window.addEventListener('resize', updateMenuVisibility);

    // Cleanup do evento quando o componente é desmontado
    return () => {
      window.removeEventListener('resize', updateMenuVisibility);
    };
  }, []);

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
                {createMenuItem('Registre-se', '/registro')}
                <li className="barra-ul">|</li>
                {createMenuItem('Login', '/login')}
            </ul>
        </nav>
    </header>
  );
};

export default Header;
