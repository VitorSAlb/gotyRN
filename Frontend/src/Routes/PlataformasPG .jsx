import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Footer from '../Components/Footer';
import Header from '../Components/Header';

import '../Styles/base.css';
import '../Styles/userPage.css';
import '../Styles/jogos.css';

const PlataformaPage = () => {
  const { PlataformaNome } = useParams();
  const [jogos, setJogos] = useState([]);
  const [plataformaDescricao, setPlataformaDescricao] = useState('');

  useEffect(() => {
    const obterDetalhesDaPlataforma = async () => {
      try {
        // Solicite os detalhes da plataforma com base no nome da plataforma
        const plataformaResponse = await fetch('http://localhost:3000/obterDetalhesDaPlataforma', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ PlataformaNome }),
        });

        const plataformaData = await plataformaResponse.json();

        // Atualize o estado com a descrição da plataforma
        setPlataformaDescricao(plataformaData.descricao);

        // Solicite os jogos da plataforma
        const jogosResponse = await fetch('http://localhost:3000/obterJogosDaPlataforma', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ PlataformaNome }),
        });

        const jogosData = await jogosResponse.json();
        setJogos(jogosData);
      } catch (error) {
        console.error('Erro ao obter detalhes da plataforma:', error.message);
      }
    };

    obterDetalhesDaPlataforma();
  }, [PlataformaNome]);

  return (
    <>
      <Header />
      <main>
        <div className="tittle-banner">
          <h3>Plataformas</h3>
        </div>

        <div className="user-container">
          <div className="user-info">
            <h2>{PlataformaNome}</h2>
            <hr />
            <p>{plataformaDescricao}</p>
          </div>
        </div>

        <div>
          <div className="tittle">
            <h2>Jogos da plataforma</h2>
            <hr />
          </div>

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
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PlataformaPage;
