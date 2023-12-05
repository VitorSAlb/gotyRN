import React from 'react'

import Footer from '../Components/Footer'
import Header from '../Components/Header'
// import Descubra from '../components/RandomGames';
import Principal from '../components/Principal'


import "../Styles/base.css"
import "../Styles/gamePage.css"

function Teste3() {
  return (
    <>
      <Header />
      <main>
        <div className="tittle-banner">
            <h3>Jogos</h3>
        </div>
          
        <Principal />

          <div>
            {/* <div className="tittle">
              <h2>Descubra</h2>
              <hr/>
            </div> */}

            {/* <Descubra /> */}
          </div>        
      </main>
      <Footer />
    </>
  );
}
export default Teste3;