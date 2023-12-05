import React from 'react'

import Footer from '../Components/Footer'
import Header from '../Components/Header'
import RG from '../components/RandomGames';
import BannerJP from '../components/bannerJP';

import "../Styles/base.css"

function App() {
  return (
    <>
      <Header />
      <main>
        <div className="tittle-banner">
            <h3>Jogos</h3>
        </div>
        <BannerJP/>
          
          <div>
            <div className="tittle">
              <h2>Descubra</h2>
              <hr/>
            </div>

            <RG />
          </div>        
      </main>
      <Footer />
    </>
  );
}
export default App;