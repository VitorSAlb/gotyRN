import React from 'react'


import Footer from './Components/Footer'
import Header from './Components/Header'
import NrSection from './components/Nrsection';
import TGY from './components/TGY';
import Banner from './components/Banner';
import Cardao from './components/Cardao';

import "./Styles/base.css"

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="tittle-banner">
              <h3>Mais Popular</h3>
          </div>
          <Banner />
          
          <div>
            <div className="tittle">
              <h2>Últimos Lançamentos</h2>
              <hr/>
            </div>

            <NrSection />
          </div>
          
          <div className="section-two">
            <div className="tgy-section">
                <div className="tittle">
                    <h2>Melhores Jogos</h2>
                    <hr/>
                </div>

                <TGY />
            </div>

            <div className="cardao-section" >
                <div className="tittle">
                    <h2>cards-slider</h2>
                    <hr/>
                </div>
                <Cardao />
            </div>
          </div>         
      </main>
      <Footer />
    </>
  );
}
export default App;