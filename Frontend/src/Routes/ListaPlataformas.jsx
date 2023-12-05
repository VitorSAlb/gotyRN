import React from 'react'


import Footer from '../Components/Footer'
import Header from '../Components/Header'
import AllPlataformasLista from '../components/AllPlataformasLista';

import "../Styles/base.css"


function ListaPlataformas() {
  return (
    <>
      <Header />
      <main>
          <div>
            <div className="tittleLista">
              <h2>Lista de Todos as Plataformas</h2>
              <div className='botoes'>
                <div className='passPlataform'>
                  <a href='/jogos/lista'>
                    <h2>Jogos</h2>
                  </a>
                </div>
                <div className="adicionar">
                    <a href="/crudPlataformas">
                        <h2>Adicionar Plataformas</h2>
                    </a>
                </div>
              </div>
            </div>

            <div className="tittle">
              <hr/>
            </div>

            <AllPlataformasLista/>

          </div>      
      </main>
      <Footer />
    </>
  );
}
export default ListaPlataformas;