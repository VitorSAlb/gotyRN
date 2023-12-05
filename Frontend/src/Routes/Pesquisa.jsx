import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import Footer from '../Components/Footer';
import Header from '../Components/Header';

import "../Styles/base.css";
import "../Styles/jogos.css";
import "../Styles/topRated.css"


function Pesquisa() {
  const [activeSection, setActiveSection] = useState('jogos');

  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [resultados, setResultados] = useState([]);

  const handleInputChange = (e) => {
    setTermoPesquisa(e.target.value);
  };

  const handlePesquisa = async () => {
    try {
      const response = await fetch(`http://localhost:3000/jogos/pesquisar?nome=${termoPesquisa}`);

      if (response.ok) {
        const dados = await response.json();
        setResultados(dados);
      } else {
        console.error('Erro ao realizar pesquisa por nome aproximado:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao realizar pesquisa por nome aproximado:', error.message);
    }
  };

  useEffect(() => {
    const obterTodosOsJogos = async () => {
      try {
        const response = await fetch('http://localhost:3000/obterTodosOsJogos');
        const data = await response.json();

         // Ordenar os jogos por data em ordem decrescente
         const jogosOrdenados = data.sort((a, b) => new Date(b.DataDeLancamento) - new Date(a.DataDeLancamento));


        setResultados(jogosOrdenados);
      } catch (error) {
        console.error('Erro ao obter jogos:', error.message);
      }
    };

    obterTodosOsJogos();
  }, []);

  

  return (
    <>
      <Header />
      <main>
        <div>
          <div className="tittle">
            <div className="title-search" id='pesquisaMaluca'>
              <h2>Pesquisa</h2>
              <div className="search-container">
              <input
              type="text"
              id="searchInput"
              placeholder="Pesquisar"
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              />
              <button id="searchButton" onClick={() => {handlePesquisa}}>
              <span className="icon"><i className="fas fa-search"></i></span>
              </button>
              </div>
              </div>
            <hr />
          </div>
          

          {activeSection === 'jogos' ? <RenderCards data={resultados} /> : <TrSection />}
        </div>
      </main>
      <Footer />
    </>
  );
}

const getFormattedDate = (date) => {
  if (date) {
    const parsedDate = new Date(date);

    if (!isNaN(parsedDate.getTime())) {
      // Se a data for válida, formate-a
      return format(parsedDate, 'dd/MM/yyyy');
    } else {
      console.error('Data inválida:', date);
    }
  }

  return '00/00/0000';
};

// Componente para renderizar os cards
const RenderCards = ({ data }) => {
  return (
    <div className="nr-section" id="newRelease">
      {data.map((item) => (
        <Link key={item.JogosID} to={`/teste3/${item.JogosID}`} className="nr-card">
        <div className="photo-card">
          <img
            style={{ height: '202px', width: '155px' }}
            src={item.ImagemJogo ? `../img/capaGames/${item.ImagemJogo}.svg` : item.ImagemJogo }
            alt={`Capa do jogo ${item.JogosNome}`}
          />
        </div>
        <div className="info-card">
          <div className="name-card">
            <h1>{item.JogosNome}</h1>
            <p>{getFormattedDate(item.DataDeLancamento)}</p>
          </div>
          <div className="publisher-card">
            <p>{item.PlataformaNome}</p>
          </div>
          <div className="score">
            <h1>{item.Nota}</h1>
          </div>
          <div className="progress-container">
            <div
              className={`progress-bar ${
                item.Nota < 50
                  ? 'progress-bar-red'
                  : item.Nota < 80
                  ? 'progress-bar-yellow'
                  : 'progress-bar-green'
              }`}
              style={{ width: `${item.Nota}%` }}
              id="progress"
            ></div>
          </div>
        </div>
        </Link>
    ))}
    </div>
  );
};

export default Pesquisa;
