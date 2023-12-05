import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import '../Styles/cardao.css';

const Cardao = () => {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    const obterTodosOsJogos = async () => {
      try {
        const response = await fetch('http://localhost:3000/obterTodosOsJogos');
        const data = await response.json();

        const jogosEmbaralhados = data.sort(() => Math.random() - 0.5);

        // Limitar a lista para apenas os primeiros 8 jogos
        const jogosLimitados = jogosEmbaralhados.slice(0, 1);

        setJogos(jogosLimitados);
      } catch (error) {
        console.error('Erro ao obter jogos:', error.message);
      }
    };

    obterTodosOsJogos();
  }, []);

  const cardClick = (JogosID) => {
    console.log(`Card clicked with JogosID: ${JogosID}`);
  };

  const getFormattedGameName = (JogosNome) => {
    // Substituir espaços por "-" e converter para minúsculas
    return JogosNome.toLowerCase().replace(/\s+/g, '-');
  };

  const getFormattedDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy'); // Formatar a data
  };

  const createGamePG = (item) => {
    return (
      <div className="main-jogo">
        <div className="capag-jogo">
          <img
            style={{ height: '606px', width: '465px' }}
            src={item.ImagemJogo ? item.ImagemJogo : `../img/capaGames/${getFormattedGameName(item.JogosNome)}.svg`}
            alt={`Capa do jogo ${item.JogosNome}`}
          />
        </div>
        <div className="info-jogo">
          <div className="nameg-jogo">
            <h1 style={{ fontSize: '2rem' }}>{item.JogosNome}</h1>
            <p>{getFormattedDate(item.DataDeLancamento)}</p>
          </div>
          <div className="publisherg-jogo">
            <p>{item.PlataformaNome}</p>
          </div>
          <div className="generog-jogo">
            <h2>{item.GeneroNome}</h2>
          </div>
          <div className="chao">
            <div className="scoreg-jogo">
              <h1 style={{ margin: '0 auto', fontSize: '2rem' }}>{item.Nota}</h1>
              <h3>user score</h3>
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
          <div className="userg-local">
              <p>Nome do usuário:</p>
              <div className="blocks-note">
                <div className="status-div">
                  <a className="statusA"></a>
                  <p className="statusP">Status v</p>
                </div>
                <div className="rateNumber-div">
                  <a></a>
                  <p>0 - 100</p>
                </div>
                <div className="rate-div">
                  <a></a>
                  <p>rate</p>
                </div>
                
              </div>
              <div className="descript-div">
                  <h2>Sobre o jogo:</h2>
                  <p>{item.Descricao}</p>
                </div>
            </div>
        </div>
      </div>
    );
  };

  return (
    <div className="jogo-section">
      {jogos.map((item) => (
        <div className="" key={item.JogosID} onClick={() => cardClick(item.JogosID)}>
          {createGamePG(item)}
        </div>
      ))}
    </div>
  );
};

export default Cardao;
