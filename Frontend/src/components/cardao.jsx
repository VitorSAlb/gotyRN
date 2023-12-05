import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import '../Styles/cardao.css'

const Cardao = () => {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    const obterTodosOsJogos = async () => {
      try {
        const response = await fetch('http://localhost:3000/obterTodosOsJogos');
        const data = await response.json();

        const jogosEmbaralhados = data.sort(() => Math.random() - 0.5);


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
    return JogosNome.toLowerCase().replace(/\s+/g, '-');
  };

  const getFormattedDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy'); 
  };


    return (
      <div className='cardao-section'>
          {jogos.map((item) =>(
            <div className="cardao" key={item.JogosID} onClick={() => cardClick(item.JogosID)}>
            <div className="photo-cardao">
            <img
                style={{ height: '404px', width: '310px' }}
                src={`../public/img/capaGames/${item.ImagemJogo}.svg`}
                alt={`Capa do jogo ${item.JogosNome}`}
            />
            </div>
            <div className="info-cardao">
            <div className="name-cardao">
                <h1 style={{ fontSize: '2rem' }}>{item.JogosNome}</h1>
                <p>{getFormattedDate(item.DataDeLancamento)}</p>
            </div>
            <div className="publisher-cardao">
            <p>{item.PlataformaNome}</p>
            </div>
            <div className="score">
                <h1 style={{ margin: '0 auto', fontSize: '2rem' }}>{item.Nota}</h1>
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
        </div>
          ))}
      </div>
        
    );
};

export default Cardao;