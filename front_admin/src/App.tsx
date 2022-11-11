import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import LoginPage from './components/LoginPage';
import { AppState } from './types/states';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';

function App() {

  const stateSelector = (state: AppState) => state;

  const dispatch = useDispatch();

  const state = useSelector(stateSelector);


  if (state.login.isLogged) {
    return (
      <div className="App">
        <Navbar />
        <hr />
        <Routes>
          <Route path="//products" element={<ProductList />} />
          <Route path="*" element={<Navigate to="/products" />} />
        </Routes>
      </div>
    )
  }
  else {
    return (
      <div className="App">
        <Navbar />
        <hr />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    )
  }
}

export default App;
