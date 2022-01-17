import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const StarWarsContext = createContext();

export function StarWarsContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState(
    {
      filterByName: '',
      filterByNumericValues: [],
    },
  );

  async function fetchAPI() {
    const resolve = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const result = await resolve.json();
    const { results } = result;

    setData(results);
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <StarWarsContext.Provider value={ { data, setData, filters, setFilters } }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
