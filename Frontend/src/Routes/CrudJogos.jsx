import React from 'react'
import FormData from '../Components/FormData'
import ListOfResult from '../Components/ListOfResult'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import "../Styles/reset.css"
import "../Styles/base.css"

function crudJogos() {
  return (
    <>
      <Header />
      <main>
        <FormData/>
        <ListOfResult />
      </main>
      <Footer />
    </>
  );
}
export default crudJogos;