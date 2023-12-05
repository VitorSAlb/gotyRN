import React, { useEffect, useState } from 'react';
import axios from "axios"

const JogoDetalhes = ({ match }) => {
  const [jogo, setJogo] = useState(null);

  useEffect(() => {
    const jogoId = match.params.id;

    // Função para obter os detalhes do jogo por ID
    const obterDetalhesJogo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/obterJogoPorId/${jogoId}`);
        setJogo(response.data);
      } catch (error) {
        console.error('Erro ao obter detalhes do jogo:', error.message);
      }
    };

    obterDetalhesJogo();
  }, [match.params.id]);

  if (!jogo) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h2>{jogo.JogosNome}</h2>
      <p>Plataforma: {jogo.Plataforma.PlataformaNome}</p>
      <p>Descrição: {jogo.Descricao}</p>

    </div>
  );
};

export default JogoDetalhes;