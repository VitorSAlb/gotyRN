import React, { useEffect, useState } from 'react';
import "../Styles/cards.css"

const AllJogos = () => {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    // Função para obter todos os jogos
    const obterTodosOsJogos = async () => {
      try {
        const response = await fetch('http://localhost:3000/obterTodosOsJogos');
        const data = await response.json();
        setJogos(data);
      } catch (error) {
        console.error('Erro ao obter jogos:', error.message);
      }
    };

    obterTodosOsJogos();
  }, []);

  return (
    <div className="nr-section" id="newRelease">
      {jogos.map((item) => (
        <div key={item.JogosID} className="nr-card" onClick={() => cardClick(item.JogosID)}>
          <div className="photo-card">
            <img
              style={{ height: '202px', width: '155px' }}
              src={`../img/capaGames/${item.ImagemJogo}.svg`}
              alt={`Capa do jogo ${item.JogosNome}`}
            />
          </div>
          <div className="info-card">
            <div className="name-card">
              <h1>{item.JogosNome}</h1>
              <p>{item.DataDeLancamento}</p>
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

export default AllJogos