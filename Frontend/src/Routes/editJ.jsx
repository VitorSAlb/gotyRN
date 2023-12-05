import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import Header from '../Components/Header';
import Footer from '../Components/Footer';

// import "../Styles/base.css";
import "../Styles/FormData.css";
import "../Styles/forms.css";

const EditJ = () => {
  const {id} = useParams();
  const [novosDados, setNovosDados] = useState({
    JogosNome: "",
    ImagemJogo: "", 
    PlataformaNome: "",
    GeneroNome: "",
    Descricao: "",
    DataDeLancamento: "",
  });

  const [jogoEditado, setJogoEditado] = useState(null)

  useEffect(() => {
    const fetchJogoDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/jogos/${id}`);
        if (response.ok) {
          const jogoDetalhes = await response.json();
          setJogoEditado(jogoDetalhes);
        } else {
          console.error('Erro ao obter detalhes do jogo:', response.statusText);
          alert('Erro ao obter detalhes do jogo:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao obter detalhes do jogo:', error.message);
        alert('Erro ao obter detalhes do jogo:', error.message);
      }
    };
  
    if (id) {
      fetchJogoDetails();
    }
  }, [id]);

  useEffect(() => {
    if (jogoEditado) {
      setNovosDados({
        ...novosDados,
        JogosNome: jogoEditado.JogosNome,
        PlataformaNome: jogoEditado.PlataformaNome,
        GeneroNome: jogoEditado.GeneroNome,
        Descricao: jogoEditado.Descricao,
        DataDeLancamento: jogoEditado.DataDeLancamento,
      });
    }
  }, [jogoEditado]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovosDados({ ...novosDados, [name]: value });
  };

  // const handleImageChange = async (e) => {
  //   const file = e.target.files[0];
  
  //   if (file && file.type === 'image/svg+xml') {
  //     try {
  //       const formData = new FormData();
  //       formData.append('ImagemJogo', file);
  
  //       const response = await fetch('http://localhost:3000/api/jogos', {
  //         method: 'POST',
  //         body: formData,
  //       });
  
  //       if (response.ok) {
  //         const imagePath = await response.json();
  //         setNovoJogo({ ...novosDados, ImagemJogo: imagePath });
  //       } else {
  //         console.error('Erro ao fazer upload da imagem:', response.statusText);
  //       }
  //     } catch (error) {
  //       console.error('Erro ao fazer upload da imagem:', error.message);
  //     }
  //   } else {
  //     console.error('Por favor, selecione um arquivo SVG.');
  //   }
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/jogos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novosDados),
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
                        <input type="text" name="JogosNome" value={novosDados.JogosNome} placeholder={jogoEditado ? `Nome Original: ${jogoEditado.JogosNome}` : 'Nome do Jogo'} onChange={handleInputChange} />
                      </div>
                      <div className='form-group'>  
                        <input type="text" name="PlataformaNome" value={novosDados.PlataformaNome} placeholder='Selecione a Plataforma' onChange={handleInputChange} />
                      </div>
                      <div className='form-group'>  
                        <input type="text" name="GeneroNome" value={novosDados.GeneroNome} placeholder='Selecione o Genero' onChange={handleInputChange} />
                      </div>
                      <div className='form-group'>  
                        <input type="date" name="DataDeLancamento" value={novosDados.DataDeLancamento} onChange={handleInputChange} />
                      </div>
                      <div className='form-group'>  
                        <textarea type="text" className='descricao' name="Descricao" value={novosDados.Descricao} placeholder='Coloque uma Descrição para o jogo' onChange={handleInputChange} />
                      </div>
                    </div>  
                    <div className='right-column'>
                    <div className='form-group'>
                          <input
                            type="text"
                            name="ImagemJogo"
                            value={novosDados.ImagemJogo}
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