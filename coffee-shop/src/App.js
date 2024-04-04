import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import React from "react";

const Home= React.lazy(()=>import('./Pages/Home'));
const NoScreen= React.lazy(()=>import('./Pages/NoScreen'));

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/" element={<Navigate to='/home'/>} />
        <Route path="*" element= {<NoScreen/>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
