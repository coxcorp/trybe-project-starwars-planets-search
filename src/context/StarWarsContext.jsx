import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const StarWarsContext = createContext();

export function StarWarsContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [newList, setNewList] = useState([]);
  const [filters, setFilters] = useState(
    {
      filterByName: '',
      filterByNumericValues: [],
    },
  );

  const numberOne = 1;

  async function fetchAPI() {
    const resolve = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const result = await resolve.json();
    const { results } = result;
    const sortResults = results.sort((a, b) => {
      if (a.name > b.name) {
        return numberOne;
      }
      if (a.name < b.name) {
        return -numberOne;
      }
      return 0;
    });
    setData(sortResults);
    setFilteredData(sortResults);
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <StarWarsContext.Provider
      value={
        { data,
          setData,
          filteredData,
          setFilteredData,
          filters,
          setFilters,
          newList,
          setNewList }
      }
    >
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
