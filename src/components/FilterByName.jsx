import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function FilterByName() {
  const { data, filters, setFilters } = useContext(StarWarsContext);
  if (data.length === 0) return <h1>Carregando...</h1>;

  return (
    <label htmlFor="filterByName">
      Planeta: &nbsp;
      <input
        data-testid="name-filter"
        type="text"
        name="filterByName"
        id="filterByName"
        value={ filters.filterByName }
        onChange={ ({ target }) => setFilters(
          {
            ...filters, filterByName: target.value,
          },
        ) }
      />
    </label>
  );
}

export default FilterByName;
