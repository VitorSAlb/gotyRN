import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';

import "../Styles/base.css"
import "../Styles/gamePage.css"

const Principal = () => {
    const [jogos, setJogos] = useState(null);
    const {id} = useParams();

    const idAnterior = id - 1;

    useEffect(() => {
        const obterTodosOsJogos = async () => {
            try {
                const response = await fetch('http://localhost:3000/obterTodosOsJogos');
                const data = await response.json();

                console.log('Data from server:', data);

                const jogosLimitados = data.slice(idAnterior, id);

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

            return format(parsedDate, 'dd/MM/yyyy');
          } else {
            console.error('Data inválida:', date);
          }
        }
      
        return '00/00/0000'; 
      };


    return (
        <div className="jogo-section">
            {jogos && jogos.map((item) => (
            <Link key={item.JogosID} to={`/jogos/jogo/${item.JogosID}`} className="main-jogo">
            <div className="capag-jogo">
                <img
                style={{ height: '606px', width: '465px' }}
                src={item.ImagemJogo ? `../img/capaGames/${item.ImagemJogo}.svg` : item.ImagemJogo }
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
                  <h1>{item.Nota}</h1>
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
            </Link>
        ))}
        </div>
    )
}

export default Principal