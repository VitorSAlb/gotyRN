import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import "../Styles/cards.css"
import { Link } from 'react-router-dom';

const TrSection = () => {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    // Função para obter todos os jogos
    const obterTodosOsJogos = async () => {
      try {
        const response = await fetch('http://localhost:3000/obterTodosOsJogos');
        const data = await response.json();

        const jogosOrdenados = data.sort((a, b) => b.Nota - a.Nota);

        const jogosLimitados = jogosOrdenados.slice(0, 10);

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

  const getFormattedGamesName = (JogosNome) => {
    return JogosNome.toLowerCase().replace(/\s+/g,'-');
  }

  const getFormattedDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  }

  return (
    <>
      <div className="top-rated-section" id="trs-container">
      {jogos.map((item) => (
        <Link className="tr-section" to={`/teste3/${item.JogosID}`}>
          <div key={item.JogosID} className='tr-card'>
            <div className='tr-photo-card'>
              <img
                style={{ height: '404px', width: '310px' }}
                src={item.ImagemJogo ? `../img/capaGames/${item.ImagemJogo}.svg` : item.ImagemJogo }
                alt={`Capa do jogo ${item.JogosNome}`}
              />
            </div>

            <div className="tr-info-card">
              <div className="tr-name-card">
                <h1>{item.JogosNome}</h1>
                <h3>{getFormattedDate(item.DataDeLancamento)}</h3>
              </div>
              <div className="tr-publisher-card">
                <h3><strong>Plataforma:</strong>{item.PlataformaNome}</h3>
              </div>
              <div className="tr-genero-card">
              <h3><strong>Genero:</strong>genero</h3>
              </div>
              <div className="chao">
                <div className="score-tr">
                  <h3>{item.Nota}</h3>
                  <h4>User Score</h4>
                </div>
                <div className="progress-container-tr">
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
          </div>
        </Link>
      ))}
    </div>
    </>
  );
};

export default TrSection