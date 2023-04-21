import React from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ADD_DATA, EDIT_DATA, HOME } from './Pages';

function App() {
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HOME />} />
          <Route path="/add-data" element={<ADD_DATA />} />
          <Route path="/edit-data/:id" element={<EDIT_DATA />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
