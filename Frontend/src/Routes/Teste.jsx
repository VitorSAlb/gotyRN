import React, { useState } from 'react';

const Teste = () => {
  const [novoJogo, setNovoJogo] = useState({
    JogosNome: "",
    ImagemJogo: "", // Alterado o nome do campo para corresponder ao estado
    PlataformaNome: "",
    GeneroNome: "",
    Decricao: "",
    DataDeLancamento: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoJogo({ ...novoJogo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/jogos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoJogo),
      });

      if (response.ok) {
        console.log('Jogo adicionado com sucesso!');
      } else {
        console.error('Erro ao adicionar o jogo:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar o jogo:', error.message);
    }
  };

  return (
    <div>
      <h2>Adicionar Jogo</h2>
      <form onSubmit={handleSubmit}>
        <label>Nome do Jogo:</label>
        <input type="text" name="JogosNome" value={novoJogo.JogosNome} onChange={handleInputChange} />
        <label>Imagem:</label>
        <input type="text" name="ImagemJogo" value={novoJogo.ImagemJogo} onChange={handleInputChange} />
        <label>Plataforma:</label>
        <input type="text" name="PlataformaNome" value={novoJogo.PlataformaNome} onChange={handleInputChange} />
        <label>Genero:</label>
        <input type="text" name="GeneroNome" value={novoJogo.GeneroNome} onChange={handleInputChange} />
        <label>Descricao:</label>
        <input type="text" name="Decricao" value={novoJogo.Decricao} onChange={handleInputChange} />
        <label>Plataforma:</label>
        <input type="text" name="DataDeLancamento" value={novoJogo.DataDeLancamento} onChange={handleInputChange} />

        <button type="submit">Adicionar Jogo</button>
      </form>
    </div>
  );
};

export default Teste;