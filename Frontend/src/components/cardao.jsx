import React, { useEffect, useState } from 'react';
import '../Styles/cardao.css';

const Cardao = () => {
  const [randomGame, setRandomGame] = useState(null);

  const gerarIdAleatoria = () => {
    const numeroAleatorio = Math.floor(Math.random() * 2) + 1;
    return 'jogo_' + numeroAleatorio;
  };

  useEffect(() => {
    const fetchRandomGame = async () => {
      try {
        // Gere uma ID aleatória
        const idAleatoria = gerarIdAleatoria();

        // Fetch logic to get a random game based on the generated ID
        const response = await fetch(`http://localhost:3000/obterJogoPorId?id=${idAleatoria}`);
        const data = await response.json();

        // Set the random game in the state
        setRandomGame(data);
      } catch (error) {
        console.error('Error fetching random game:', error);
      }
    };

    // Chame a função para buscar um jogo aleatório quando o componente montar
    fetchRandomGame();
  }, []); // O array de dependências vazio garante que esse efeito seja executado apenas uma vez quando o componente montar

  const renderProgressColor = (progress) => {
    if (progress < 50) {
      return 'progress-bar-red';
    } else if (progress < 80) {
      return 'progress-bar-yellow';
    } else {
      return 'progress-bar-green';
    }
  };

  const cardClick = (id) => {
    const idjogo = id;
    if (idjogo) {
      window.location.href = `/src/pages/jogo.html?id=${id}`;
    } else {
      console.log('Jogo não encontrado.');
    }
  };

  return (
    <div className="cardao-section">
      {randomGame && (
        <div key={randomGame.JogosID} className="cardao" onClick={() => cardClick(randomGame.JogosID)}>
          <div className="photo-cardao">
            <img
              style={{ height: '404px', width: '310px' }}
              src={`../img/capaGames/${randomGame.imagesLink}.svg`}
              alt={`Capa do jogo ${randomGame.title}`}
            />
          </div>
          <div className="info-cardao">
            <div className="name-cardao">
              <h1>{randomGame.JogosNome}</h1>
              <p>{randomGame.DataDeLancamento}</p>
            </div>
            <div className="publisher-cardao">
              <p>{randomGame.PlataformaNome}</p>
            </div>
            <div className="score">
              <h1>{randomGame.Nota}</h1>
            </div>
            <div className="progress-container">
              <div
                className={`progress-bar ${renderProgressColor(randomGame.Nota)}`}
                style={{ width: `${randomGame.Nota}%` }}
                id="progress"
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cardao;
