import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home-page';
import { HostPage } from './pages/host-page';
import { PotlukkDetailsGuestPage } from './pages/potlukk-details-guest-page';
import { PotlukkDetailsHostPage } from './pages/potlukk-details-host-page';
import { RegistrationPage } from './pages/registration-page';
import { SignInPage } from './pages/sign-in-page';

function App() {
  return <>
    <h1>Potlukk Website!</h1>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignInPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/registration' element={<RegistrationPage/>}/>
        <Route path='/host' element={<HostPage/>}/>
        <Route path='/potlukkinfohost/:potlukkID' element={<PotlukkDetailsHostPage/>}/>
        <Route path='/potlukkinfoguest/:potlukkID' element={<PotlukkDetailsGuestPage/>}/>
        
      </Routes>
    </BrowserRouter>
  </>
}

export default App;
