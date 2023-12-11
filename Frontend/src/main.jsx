import React from 'react'
import ReactDOM from 'react-dom/client'


import App from './App'
import Jogos from './Routes/Jogos'

import Pesquisa from './Routes/PesquisaSection'
import Login from './Routes/Login'
import Registro from './Routes/Registro'
import CrudJ from './Routes/crudJ'
import CrudP from './Routes/crudP'
import EditJ from './Routes/editJ'
import EditP from './Routes/EditP'
import UserPG from './Routes/UserPG'
import PlataformasPG from './Routes/PlataformasPG '
import Teste3 from './Routes/Teste'
import ListaJogos from './Routes/ListaJogos'
import ListaPlataformas from './Routes/ListaPlataformas'
// import JogoDetalhes from './Routes/Teste5'


import "./Styles/reset.css"
import "./Styles/base.css"


import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import RouteData from './Routes/RouteData'
import ErrorPage from './Routes/ErrorPage'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
  path: "/modify/:id",
  element: <RouteData />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/crudJogos",
    element: <CrudJ />,
  },
  {
    path: "/jogos/lista",
    element: <ListaJogos />,
  },
  {
    path: "/crudPlataformas",
    element: <CrudP />,
  },
  {
    path: "/plataformas/lista",
    element: <ListaPlataformas />,
  },
  {
    path: "/jogos",
    element: <Jogos />
  },
  {
    path: "/EditJ/:id",
    element: <EditJ />
  },
  {
    path: "/EditP/:id",
    element: <EditP />
  },
  {
    path: "/jogos/pesquisa",
    element: <Pesquisa />
  },
  {
    path: "/teste3/:id",
    element: <Teste3 />
   },
  // {
  //   path: "/teste5/:id",
  //   element: <JogoDetalhes />
  // },
  {
    path: "/user/:UsuarioNome",
    element: <UserPG />
  },
  {
    path: "/plataformas/:PlataformaNome",
    element: <PlataformasPG />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
