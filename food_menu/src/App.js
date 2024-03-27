import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";

const Layout= React.lazy(()=>import('./Layout'));


function App() {
  return (
      <HashRouter>
        <Routes>
          <Route path="/home" element={ <Layout/> } />
          <Route path="/" element={<Navigate to='/home' />} />
        </Routes>
      </HashRouter>
  );
}

export default App;
