import React from 'react'
import './App.css'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Admins from './components/Admins'
import Home from './components/Home'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SuperAdmin from './components/SuperAdmin'
import Dashboard from './components/Dashboard/Dashboard'

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='super-admin' element={<SuperAdmin/>}></Route>
      <Route path='/admins' element={<Admins/>}></Route>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}
