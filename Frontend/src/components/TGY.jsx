import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import "../Styles/cards.css"

const NrSection = () => {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    // Função para obter todos os jogos
    const obterTodosOsJogos = async () => {
      try {
        const response = await fetch('http://localhost:3000/obterTodosOsJogos');
        const data = await response.json();

        const jogosOrdenados = data.sort((a, b) => b.Nota - a.Nota);

        const jogosLimitados = jogosOrdenados.slice(0, 6);

        setJogos(jogosLimitados);
      } catch (error) {
        console.error('Erro ao obter jogos:', error.message);
      }
    };

    obterTodosOsJogos();
  }, []);

  const cardClick = (JogosID) => {
    // Handle card click logic here
    console.log(`Card clicked with JogosID: ${JogosID}`);
  };

  const getFormattedGamesName = (JogosNome) => {
    return JogosNome.toLowerCase().replace(/\s+/g,'-');
  }

  const getFormattedDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  }

  return (
    <div className="nr-section" id="newRelease">
      {jogos.map((item) => (
        <div key={item.JogosID} className="nr-card" onClick={() => cardClick(item.JogosID)}>
          <div className="photo-card">
            <img
              style={{ height: '202px', width: '155px' }}
              src={item.ImagemJogo ? item.ImagemJogo : `../img/capaGames/${getFormattedGamesName(item.JogosNome)}.svg`}
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
        </div>
      ))}
    </div>
  );
};

export default NrSection