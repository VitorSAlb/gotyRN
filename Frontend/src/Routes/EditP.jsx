import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../Components/Header';
import Footer from '../Components/Footer';

import "../Styles/FormData.css";
import "../Styles/forms.css";

const EditP = () => {
const {id} = useParams()
  
  const [plataformaId, setPlataformaId] = useState(id);
  const [novaPlataforma, setNovaPlataforma] = useState({
    PlataformaNome: "",
    Descricao: "",
  });

  useEffect(() => {
    // Obter dados da plataforma a ser editada ao carregar a página
    const obterDadosDaPlataforma = async () => {
      try {
        const response = await fetch(`http://localhost:3000/obterPlataformaPorId/${id}`);
        const dadosDaPlataforma = await response.json();

        setPlataformaId(id);

        // Verificar se os dados da plataforma foram carregados
        
        setNovaPlataforma((prevPlataforma) => ({
          ...prevPlataforma,
          PlataformaNome: dadosDaPlataforma.PlataformaNome,
          Descricao: dadosDaPlataforma.Descricao,
        }));
        
      } catch (error) {
        console.error('Erro ao obter dados da plataforma:', error.message);
      }
    };

    obterDadosDaPlataforma();
  }, [plataformaId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovaPlataforma({ ...novaPlataforma, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/editarPlataforma/${plataformaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaPlataforma),
      });

      if (response.ok) {
        console.log('Plataforma editada com sucesso!');
        alert('Plataforma editada com sucesso!');
      } else {
        console.error('Erro ao editar a plataforma:', response.statusText);
        alert('Erro ao editar a plataforma:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao editar a plataforma:', error.message);
      alert('Erro ao editar a plataforma:', error.message);
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
              <h1>Editar Plataforma</h1>
            </div>

            <div className='form-container'>
              <div className='left-column'>
              <div className='form-group'>
                  <input
                    type="text"
                    name="PlataformaNome"
                    value={novaPlataforma.PlataformaNome}
                    placeholder={`Nome da Plataforma (Atual: ${novaPlataforma.PlataformaNome})`}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='form-group'>
                  <textarea
                    type="text"
                    className='descricao'
                    name="Descricao"
                    value={novaPlataforma.Descricao}
                    placeholder={`Descrição (Atual: ${novaPlataforma.Descricao})`}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className='right-column'>
                <button type="submit">Editar Plataforma</button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EditP;