import React, { useEffect } from 'react';
import '../Styles/cardao.css'

const Cardao = ({jogo}) => {

    const id = 1;
    const title = "Starfield";
    const releseData = "06/09/2023";
    const imagesLink = "starfield";
    const publisher = "Microsoft";
    const genero = "RPG | Aventura";
    const description = "Jogo com mais de mil planetas exploraveis";
    const progress = 70;
    
    const renderProgressColor = (progress) => {
        if (progress < 50) {
          return "progress-bar-red";
        } else if (progress < 80) {
          return "progress-bar-yellow";
        } else {
          return "progress-bar-green";
        }
    };

    const cardClick = (id) => {
        const idjogo = id;
        if (idjogo) {
        window.location.href = `/src/pages/jogo.html?id=${id}`;
        } else {
        console.log("Jogo não encontrado.");
        }
    };

    return (
        <div className="cardao" key={id} onClick={() => cardClick(id)}>
            <div className="photo-cardao">
            <img
                style={{ height: '404px', width: '310px' }}
                src={`../imgs/capaGames/${imagesLink}.svg`}
                alt={`Capa do jogo ${title}`}
            />
            </div>
            <div className="info-cardao">
            <div className="name-cardao">
                <h1 style={{ fontSize: '2rem' }}>{title}</h1>
                <p>{releseData}</p>
            </div>
            <div className="publisher-cardao">
                <p>{publisher}</p>
            </div>
            <div className="score">
                <h1 style={{ margin: '0 auto', fontSize: '2rem' }}>{progress}</h1>
                <div className="progress-container">
                <div
                    className={`progress-bar ${
                    progress < 50
                        ? 'progress-bar-red'
                        : progress < 80
                        ? 'progress-bar-yellow'
                        : 'progress-bar-green'
                    }`}
                    style={{ width: `${progress}%` }}
                    id="progress"
                ></div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Cardao;