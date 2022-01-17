import React from 'react';
import './App.css';
import Filters from './components/Filters';
// import ListFilters from './components/ListFilters';
// import Table from './components/Table';
import StarWarsContextProvider from './context/StarWarsContext';

function App() {
  return (
    <StarWarsContextProvider>
      <Filters />
      {/* <ListFilters /> */}
      {/* <Table /> */}
    </StarWarsContextProvider>
  );
}

export default App;
