import { Router } from 'react-router-dom';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
//Registration import 
import Register from './pages/Register';
import Idsearch from './pages/Idsearch';
import Advancedsearch from './pages/Advancedsearch';
import Educationalsearch from './pages/Educationalsearch';
import Locationsearch from './pages/Locationsearch';
import Occupationalsearch from './pages/Occupationalsearch';
import Smartsearch from './pages/Smartsearch';
import Search from './pages/SearchResults'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/idsearch' element={<Idsearch />} />
        <Route path='/advancedsearch' element={<Advancedsearch />} />
        <Route path='/educationalsearch' element={<Educationalsearch />} />
        <Route path='/locationsearch' element={<Locationsearch />} />
        <Route path='/occupationalsearch' element={<Occupationalsearch />} />
        <Route path='/smartsearch' element={<Smartsearch />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </Router>
  );
};

export default App;
