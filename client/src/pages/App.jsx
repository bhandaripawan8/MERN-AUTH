
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React from 'react'
import Registration from './Registration';
import Login from './Login';
import Dashboard from './Dashboard';

export default function App() {

  return (
    <div>
      <h2 style={{color: 'teal', display: 'flex', alignItems: 'center', justifyContent: 'center',   marginTop: '40px'}}>Welcome to your registraiton/login app</h2>
        <BrowserRouter>
        <Routes>
          <Route path='/'></Route>
          <Route path='/dashboard' exact Component = {Dashboard}></Route>
          <Route path='/registration' exact Component={Registration}></Route>
          <Route path='/login' exact Component={Login}></Route>
        </Routes>
      </BrowserRouter>
    </div>

  )
}
