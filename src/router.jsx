import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import Main from './pages/Main'

import { getItem } from './utils/storage'



function RoutesProtect({ redirectTo }) {

  const verificasao = getItem('token')

  return verificasao ? <Outlet /> : <Navigate to={redirectTo} />
}

export default function MainRouters() {

  return (
    <Routes>
      <Route path='/' element={<Cadastro />} />
      <Route path='/login' element={<Login />} />
      <Route element={<RoutesProtect redirectTo='/login' />}>
        <Route path='/main' element={<Main />} />
      </Route >
    </Routes>
  )
}