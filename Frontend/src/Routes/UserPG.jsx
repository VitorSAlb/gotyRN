import React from 'react'


import Footer from '../Components/Footer'
import Header from '../Components/Header'
import RandomGames from '../components/RandomGames'
// import { verificarUsuarioAtivo } from '../../../backend/server'

import "../Styles/base.css"
import "../Styles/userPage.css"
import "../Styles/jogos.css";



function UserPG() {
  return (
    <>
        <Header />
            <main>

                <div className='tittle-banner'>
                    <h3>Perfil</h3>
                </div>
                
                <div className='user-container'>
                    <div className='user-info'>
                        <img src='../../public/user-padrao.svg'></img>
                        <hr></hr>
                        <h2>Usuario</h2>
                    </div>
                </div>

                <div>
                    <div className="tittle">
                        <h2>Descubra</h2>
                        <hr/>
                    </div>

                    <RandomGames />
                </div>
            </main>
        <Footer />
    </>
  );
}
export default UserPG;