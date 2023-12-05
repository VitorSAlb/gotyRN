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

         // Limitar a lista para apenas os primeiros 8 jogos
         const jogosLimitados = jogosOrdenados.slice(0, 8);

        setResultados(jogosLimitados);
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
          
          {/* Adicione um input controlado para o termo de pesquisa */}
          

          {/* Renderizar a seção com base no estado ativo */}
          {activeSection === 'jogos' ? <RenderCards data={resultados} /> : <TrSection />}
        </div>
      </main>
      <Footer />
    </>
  );
}

// Componente para renderizar os cards
const RenderCards = ({ data }) => {
  return (
    <div className="nr-section" id="newRelease">
      {data.map((item) => (
        <div key={item.JogosID} className="nr-card" onClick={() => cardClick(item.JogosID)}>
          {/* Conteúdo do card */}
        </div>
      ))}
    </div>
  );
};

export default Pesquisa;
