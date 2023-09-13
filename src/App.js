import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Input from './component/Input';
import Update from './component/Update';
import View from './component/View';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } /> 
          <Route path='/view/:id' element={ <View /> } /> 
          <Route path='/input' element={ <Input /> } /> 
          <Route path='/update/:id' element={ <Update /> } /> 
        </Routes>
      </BrowserRouter>  
    </>
  );
}

export default App;
