import React from 'react';
import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';
import { StarWarsContextProvider } from './context/StarWarsContext';

function App() {
  return (
    <StarWarsContextProvider>
      <Filters />
      <Table />
    </StarWarsContextProvider>
  );
}

export default App;
