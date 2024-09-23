import React from 'react'
import './App.css'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Admins from './components/Admins'
import Home from './components/Home'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      
      <Route path='/admins' element={<Admins/>}></Route>
      <Route path='/' element={<Home/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}
