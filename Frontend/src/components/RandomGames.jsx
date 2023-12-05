import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import "../Styles/cards.css";

const RandomGames = () => {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    const obterTodosOsJogos = async () => {
      try {
        const response = await fetch('http://localhost:3000/obterTodosOsJogos');
        const data = await response.json();

         const jogosEmbaralhados = data.sort(() => Math.random() - 0.5);

         // Limitar a lista para apenas os primeiros 8 jogos
         const jogosLimitados = jogosEmbaralhados.slice(0, 8);

        setJogos(jogosLimitados);
      } catch (error) {
        console.error('Erro ao obter jogos:', error.message);
      }
    };

    obterTodosOsJogos();
  }, []);

  const cardClick = (JogosID) => {
    console.log(`Card clicked with JogosID: ${JogosID}`);
    window.location.reload();
  };

  const getFormattedGameName = (JogosNome) => {

    return JogosNome.toLowerCase().replace(/\s+/g, '-');
  };

  const getFormattedDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };

  return (
    <div className="nr-section" id="newRelease">
      {jogos.map((item) => (
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

export default RandomGames;
