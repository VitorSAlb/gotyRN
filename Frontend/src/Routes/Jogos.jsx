import React, { useState } from 'react'

import Footer from '../Components/Footer'
import Header from '../Components/Header'
import AllJogos from '../components/AllJogos';
import TrSection from '../components/TrSection';

import "../Styles/base.css"
import "../Styles/jogos.css"
import "../Styles/topRated.css"

function Jogos() {

    const [activeSection, setActiveSection] = useState('jogos');

    const changeSection = (section) => {
      setActiveSection(section);
    };
  
    return (
      <>
        <Header />
        <main>
          <div>
            <div className="tittle">
              <div className="title-search">
                <ul>
                  <li>
                    <a
                        id="tnrJogos"
                        href="#"
                        onClick={() => changeSection('jogos')}
                        className={`section-link ${activeSection === 'jogos' ? 'active' : ''}`}
                    >
                        Jogos
                    </a>
                  </li>
                  <li>
                    <a
                        id="ttrJogos"
                        href="#"
                        onClick={() => changeSection('melhores')}
                        className={`section-link ${activeSection === 'melhores' ? 'active' : ''}`}
                    >
                        Melhores Avaliados
                    </a>
                  </li>
                  <li>
                    <a href="/crudJogos">Adicionar</a>
                  </li>
                </ul>
              </div>
              <hr />
            </div>
  
            {activeSection === 'jogos' ? <AllJogos /> : <TrSection />}
          </div>
        </main>
        <Footer />
      </>
    );
  }
export default Jogos;