import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import createSagaMiddleware from '@redux-saga/core';
import { HomePage } from './pages/home-page';
import { HostPage } from './pages/host-page';
import { PotlukkDetailsGuestPage } from './pages/potlukk-details-guest-page';
import { PotlukkDetailsHostPage } from './pages/potlukk-details-host-page';
import { RegistrationPage } from './pages/registration-page';
import { SignInPage } from './pages/sign-in-page';
import { bringDishReducer } from './reducers/bring-dish-reducer';
import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootSaga } from './sagas/dish-sagas';
import "./style/styles.css";

const queryClient = new QueryClient();
const sagaMiddleware = createSagaMiddleware();
const store = createStore(bringDishReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

function App() {



  return <>
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
    </Provider>
  </>
}

export default App;
