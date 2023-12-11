import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../Components/Header';
import Footer from '../Components/Footer';

// import "../Styles/base.css";
import "../Styles/FormData.css";
import "../Styles/forms.css";

const EditJ = () => {
  const {id} = useParams()

  const [jogoId, setJogoId] = useState(id);
  const [novoJogo, setNovoJogo] = useState({
    JogosNome: "",
    ImagemJogo: "",
    PlataformaNome: "",
    GeneroNome: "",
    Descricao: "",
    DataDeLancamento: ""
  });

  useEffect(() => {
    // Obter dados do jogo a ser editado ao carregar a página
    const obterDadosDoJogo = async () => {
      try {
        const response = await fetch(`http://localhost:3000/obterJogoPorId/${jogoId}`);
        const dadosDoJogo = await response.json();

        setJogoId(jogoId);
        setNovoJogo((prevJogo) => ({
          ...prevJogo,
          JogosNome: dadosDoJogo.JogosNome,
          ImagemJogo: dadosDoJogo.ImagemJogo,
          PlataformaNome: dadosDoJogo.PlataformaNome,
          GeneroNome: dadosDoJogo.GeneroNome,
          Descricao: dadosDoJogo.Descricao,
          DataDeLancamento: dadosDoJogo.DataDeLancamento,
        }));
      } catch (error) {
        console.error('Erro ao obter dados do jogo:', error.message);
      }
    };

    obterDadosDoJogo();
  }, [jogoId]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoJogo({ ...novoJogo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/editarJogo/${jogoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoJogo),
      });

      if (response.ok) {
        console.log('Jogo editado com sucesso!');
        alert('Jogo editado com sucesso!');
      } else {
        console.error('Erro ao editar o jogo:', response.statusText);
        alert('Erro ao editar o jogo:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao editar o jogo:', error.message);
      alert('Erro ao editar o jogo:', error.message);
    }
  };

  return (
    <>
      <Header />
      
        <main>
            <div className="voltar">
              <a href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                  >
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
              </a>
            </div>
            
            <div className='all-container'>
              <form onSubmit={handleSubmit} className='form'>
                <div className='tittle-crud'>
                  <h1>Editar Jogo</h1>
                </div>

                  <div className='form-container'>
                    <div className='left-column'>
                      <div className='form-group'>  
                        <input type="text" name="JogosNome" value={novoJogo.JogosNome} placeholder={`Nome do Jogo (Atual: ${novoJogo.JogosNome})`} onChange={handleInputChange} />
                      </div>
                      <div className='form-group'>  
                        <input type="text" name="PlataformaNome" value={novoJogo.PlataformaNome} placeholder={`Plataforma (Atual: ${novoJogo.PlataformaNome})`} onChange={handleInputChange} />
                      </div>
                      <div className='form-group'>  
                        <input type="text" name="GeneroNome" value={novoJogo.GeneroNome} placeholder={`Gênero (Atual: ${novoJogo.GeneroNome})`} onChange={handleInputChange} />
                      </div>
                      <div className='form-group'>  
                        <input type="date" name="DataDeLancamento" value={novoJogo.DataDeLancamento} onChange={handleInputChange} />
                      </div>
                      <div className='form-group'>  
                        <textarea type="text" name="Descricao" value={novoJogo.Descricao} placeholder={`Descrição (Atual: ${novoJogo.Descricao})`} onChange={handleInputChange} />
                      </div>
                    </div>  
                    <div className='right-column'>
                    <div className='form-group'>
                          <input
                            type="text"
                            name="ImagemJogo"
                            value={novoJogo.ImagemJogo}
                            placeholder='Nome da sua imagem sem .svg'
                            onChange={handleInputChange}
                          />
                        </div>
                        <p className='obs'>OBS: coloque a imagem na /public/img/capaGames/<br/> e acima escreva so o nome da sua imagem svg</p>
                        <button type="submit">Editar Jogo</button>
                    </div>    
                    
                    
                  </div>
              </form>
            </div>
        </main>
      <Footer />
    </>
  );
};

export default EditJ;