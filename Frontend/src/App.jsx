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
        <div class="tittle-banner">
              <h3>Mais Popular</h3>
          </div>
          <Banner />
          
          <div>
            <div class="tittle">
              <h2>Últimos Lançamentos</h2>
              <hr/>
            </div>

            <NrSection />
          </div>
          
          <div class="section-two">
            <div class="tgy-section">
                <div class="tittle">
                    <h2>Melhores Jogos</h2>
                    <hr/>
                </div>

                <TGY />
            </div>

            <div class="cardao-section" >
                <div class="tittle">
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