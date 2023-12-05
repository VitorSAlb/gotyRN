import React from 'react'
import ReactDOM from 'react-dom/client'


import App from './App'
import Jogos from './Routes/Jogos'
import JP from './Routes/JogoID'
import Login from './Routes/Login'
import Registro from './Routes/Registro'
import CrudJ from './Routes/crudJ'
import CrudP from './Routes/crudP'
import EditJ from './Routes/editJ'

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
    path: "/crudPlataformas",
    element: <CrudP />,
  },
  {
    path: "/jogos",
    element: <Jogos />
  },
  {
    path: "/jogos/jogo/:id",
    element: <JP />
  },
  {
    path: "/EditJ/:id",
    element: <EditJ />
  },
  // {
  //   path: "/jogos/pesquisa",
  //   element: <Pesquisa />
  // },
  // {
  //   path: "/jogos/pesquisa",
  //   element: <Pesquisa />
  // },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
