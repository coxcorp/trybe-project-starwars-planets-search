import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function ListFilters() {
  const { data, setFilteredData, filters, setFilters } = useContext(StarWarsContext);
  if (filters.filterByNumericValues.length === 0) {
    return <span>Nenhum filtro selecionado</span>;
  }

  function deleteFilter({ target }) {
    const localFilter = filters.filterByNumericValues
      .filter((filter) => filter.column !== target.value);
    console.log(localFilter);
    setFilters({ ...filters,
      filterByNumericValues: localFilter,
    });
    setFilteredData(data);
  }

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
          onClick={ deleteFilter }
        >
          x
        </button>
      </div>
    ))
  );
}
export default ListFilters;
