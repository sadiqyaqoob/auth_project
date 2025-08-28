import React from 'react'
import { Route,Routes } from 'react-router-dom'
import './index.css'


import { EmailVerify, Home, Login, ResetPassword } from './pages'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/resetPasswodr' element={<ResetPassword/>}/>
      <Route path='/email-verify' element={<EmailVerify/>}/>
      
    </Routes>
  )
}

export default App