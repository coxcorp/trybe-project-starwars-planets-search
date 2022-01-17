import React, { useEffect, createContext, useState } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_VALUE = {
  planets: [],
};

export const StarWarsContext = createContext();

function StarWarsContextProvider({ children }) {
  const [planets, setPlanets] = useState(DEFAULT_VALUE);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const response = await data.json();
      const newPlanets = response.results;
      setPlanets(newPlanets.sort((a, b) => a.name.localeCompare(b.name)).map((planet) => {
        delete planet.residents;
        return planet;
      }));
    };
    fetchData();
  }, []);

  return (
    <StarWarsContext.Provider value={ planets }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsContextProvider;
