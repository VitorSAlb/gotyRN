import React, { useEffect, useState } from 'react';
import "../Styles/banner.css"

const Banner = ({ jogo }) => {
  const id = 1;
  const title = "Starfield";
  const releseData = "06/09/2023";
  const imagesLink = "starfield";
  const publisher = "Microsoft";
  const genero = "RPG | Aventura";
  const description = "Jogo com mais de mil planetas exploráveis";
  const progress = 58;

  const renderProgressColor = (progress) => {
    if (progress < 50) {
      return "progress-bar-red";
    } else if (progress < 80) {
      return "progress-bar-yellow";
    } else {
      return "progress-bar-green";
    }
  };

  const redirectUrl = "/teste3/1";

  return (
    <a href={redirectUrl} target="_blank" rel="noopener noreferrer" className="main-banner">
      <div className="capag-banner">
        <img src={`/img/capaGames/starfield.svg`} alt={`Capa do jogo ${title}`} />
      </div>
      <div className="info-banners">
        <div className="nameg-banner">
          <h1>{title}</h1>
          <h3>{releseData}</h3>
        </div>
        <div className="publisherg-banner">
          <h2>{publisher}</h2>
        </div>
        <div className="chao">
          <div className="scoreg-jogo">
            <h1>{progress}</h1>
            <h3>user score</h3>
          </div>
          <div className="progress-container">
            <div
              className={`progress-bar ${renderProgressColor(progress)}`}
              style={{ width: `${progress}%` }}
              id="progress"
            ></div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Banner;
