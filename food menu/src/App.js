import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";

const Layout= React.lazy(()=>import('./Layout'));


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={ <Layout/> } />
          <Route path="/" element={<Navigate to='/home' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
