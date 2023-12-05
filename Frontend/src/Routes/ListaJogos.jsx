import React from 'react'


import Footer from '../Components/Footer'
import Header from '../Components/Header'
import AllJogos from '../components/AllJogosLista';

import "../Styles/base.css"


function ListaJogos() {

  

  return (
    <>
      <Header />
      <main>
          <div>
            <div className="tittleLista">
              <h2>Lista de Todos os jogos</h2>
              <div className='botoes'>
                <div className='passPlataform'>
                  <a href='/plataformas/lista'>
                    <h2>Plataformas</h2>
                  </a>
                </div>
                <div class="adicionar">
                    <a href="/crudJogos">
                        <h2>Adicionar Jogos</h2>
                    </a>
                </div>
              </div>
            </div>

            <div className="tittle">
              <hr/>
            </div>

            <AllJogos/>

          </div>      
      </main>
      <Footer />
    </>
  );
}
export default ListaJogos;