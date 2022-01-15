import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const StarWarsContext = createContext();

export function StarWarsContextProvider({ children }) {
  const [data2, setData2] = useState([]);
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

    setData2(results);
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  const data = (data2
    .filter((datum) => datum.name.toLowerCase()
      .includes(filters.filterByName.toLowerCase())));
  return (
    <StarWarsContext.Provider value={ { data, filters, setFilters } }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
