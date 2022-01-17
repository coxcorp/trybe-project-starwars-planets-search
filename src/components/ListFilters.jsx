import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function ListFilters() {
  const { filters } = useContext(StarWarsContext);

  return (
    filters.filterByNumericValues.map((filter) => (
      <div
        key={ filter.column }
      >
        <span
          data-testid="filter"
        >
          {`${filter.column} - ${filter.comparison} - ${filter.quantity}` }
        </span>
        &nbsp;
        <button
          type="button"
          value={ filter.column }
        >
          x
        </button>
      </div>))
  );
}

export default ListFilters;
