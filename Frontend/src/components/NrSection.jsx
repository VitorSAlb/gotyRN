import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import "../Styles/cards.css";

const NrSection = () => {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    const obterTodosOsJogos = async () => {
      try {
        const response = await fetch('http://localhost:3000/obterTodosOsJogos');
        const data = await response.json();

         // Ordenar os jogos por data em ordem decrescente
         const jogosOrdenados = data.sort((a, b) => new Date(b.DataDeLancamento) - new Date(a.DataDeLancamento));

         // Limitar a lista para apenas os primeiros 8 jogos
         const jogosLimitados = jogosOrdenados.slice(0, 8);

        setJogos(jogosLimitados);
      } catch (error) {
        console.error('Erro ao obter jogos:', error.message);
      }
    };

    obterTodosOsJogos();
  }, []);


  const getFormattedGameName = (JogosNome) => {

    return JogosNome.toLowerCase().replace(/\s+/g, '-');
  };

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

export default NrSection;
