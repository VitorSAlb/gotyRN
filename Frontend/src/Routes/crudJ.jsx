import React, { useState } from 'react';

import Header from '../Components/Header';
import Footer from '../Components/Footer';

// import "../Styles/base.css";
import "../Styles/FormData.css";
import "../Styles/forms.css";

const Teste = () => {
  const [novoJogo, setNovoJogo] = useState({
    JogosNome: "",
    ImagemJogo: "", // Alterado o nome do campo para corresponder ao estado
    PlataformaNome: "",
    GeneroNome: "",
    Descricao: "",
    DataDeLancamento: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoJogo({ ...novoJogo, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Assume que está permitindo apenas um arquivo
  
    // Faça o que precisar com o arquivo, por exemplo, exiba informações ou faça upload
    console.log('Arquivo selecionado:', file);
  
    // Se você quiser armazenar o arquivo no estado para uso posterior
    setNovoJogo({
      ...novoJogo,
      ImagemJogo: file,
    });
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
        alert('Jogo adicionado com sucesso!');
        
      } else {
        console.error('Erro ao adicionar o jogo:', response.statusText);
        alert('Erro ao adicionar o jogo:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar o jogo:', error.message);
      alert('Erro ao adicionar o jogo:', error.message);
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
                  <h1>Adicionar Novo Jogo</h1>
                </div>

                  <div className='form-container'>
                    <div className='left-column'>
                      <div className='form-group'>  
                        <input type="text" name="JogosNome" value={novoJogo.JogosNome} placeholder='Nomde do Jogo' onChange={handleInputChange} />
                      </div>
                      <div className='form-group'>  
                        <input type="text" name="PlataformaNome" value={novoJogo.PlataformaNome} placeholder='Selecione a Plataforma' onChange={handleInputChange} />
                      </div>
                      <div className='form-group'>  
                        <input type="text" name="GeneroNome" value={novoJogo.GeneroNome} placeholder='Selecione o Genero' onChange={handleInputChange} />
                      </div>
                      <div className='form-group'>  
                        <input type="date" name="DataDeLancamento" value={novoJogo.DataDeLancamento} onChange={handleInputChange} />
                      </div>
                      <div className='form-group'>  
                        <textarea type="text" className='descricao' name="Descricao" value={novoJogo.Descricao} placeholder='Coloque uma Descrição para o jogo' onChange={handleInputChange} />
                      </div>
                    </div>  
                    <div className='right-column'>
                    <div className='form-group'>
                          <label htmlFor="imagemJogo">Imagem do Jogo:</label>
                          <input
                          type="file"
                          name="ImagemJogo"
                          id="imagemJogo"
                          accept=".svg"
                          onChange={handleImageChange}
                        />
                        </div>
                        {/* <p className='obs'>OBS: coloque a imagem na /public/img/capaGames/<br/> e acima escreva so o nome da sua imagem svg</p> */}
                        <button type="submit">Adicionar Jogo</button>
                    </div>    
                    
                    
                  </div>
              </form>
            </div>
        </main>
      <Footer />
    </>
  );
};

export default Teste;