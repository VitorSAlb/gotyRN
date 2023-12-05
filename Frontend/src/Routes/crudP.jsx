import React, { useState } from 'react';

import Header from '../Components/Header';
import Footer from '../Components/Footer';

// import "../Styles/base.css";
import "../Styles/FormData.css";
import "../Styles/forms.css";

const CrudP = () => {
  const [novaPlataforma, setNovaPlataforma] = useState({
    PlataformaNome: "",
    Descricao: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaPlataforma({ ...novaPlataforma, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/plataformas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaPlataforma),
      });

      if (response.ok) {
        console.log('Plataforma adicionada com sucesso!');
        alert('Plataforma adicionada com sucesso!');
      } else {
        console.error('Erro ao adicionar a plataforma:', response.statusText);
        alert('Erro ao adicionar a plataforma:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao adicionar a plataforma:', error.message);
      alert('Erro ao adicionar a plataforma:', error.message);
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
                  <h1>Adicionar Nova Plataforma</h1>
                </div>

                  <div className='form-container'>
                    <div className='left-column'>
                      <div className='form-group'>  
                        <input type="text" name="PlataformaNome" value={novaPlataforma.PlataformaNome} placeholder='Digite o nome da plataforma' onChange={handleInputChange} />
                      </div>
                      <div className='form-group'>  
                        <textarea type="text" className='descricao' name="Descricao" value={novaPlataforma.Descricao} placeholder='Coloque uma Descrição para a plataforma' onChange={handleInputChange} />
                      </div>
                    </div>  
                    <div className='right-column'>
                        <button type="submit">Adicionar Plataforma</button>
                    </div>    
                    
                    
                  </div>
              </form>
            </div>
        </main>
      <Footer />
    </>
  );
};

export default CrudP;