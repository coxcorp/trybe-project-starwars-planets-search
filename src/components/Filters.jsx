import React, { useState, useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function Filters() {
  const { filters, setFilters } = useContext(StarWarsContext);
  const [filterState, setFilterState] = useState(
    {
      // column: 'Selecione',
      // comparison: 'Selecione',
      // quantity: 0,
    },
  );

  function handleSubmit(event) {
    event.preventDefault();
    setFilters({ filterByNumericValues:
      [
        ...filters.filterByNumericValues, filterState,
      ] });
    setFilterState(
      {
        // column: 'Selecione',
        // comparison: 'Selecione',
        // quantity: 0,
      },
    );
  }

  return (
    <>
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
      <form onSubmit={ handleSubmit }>
        <label htmlFor="filterByNumericValues">
          &nbsp;Comparação numérica: &nbsp;
          <select
            data-testid="column-filter"
            name="column"
            id="column"
            value={ filterState.column }
            onChange={ ({ target }) => setFilterState(
              { ...filterState, column: (target.value) },
            ) }
          >
            {/* ref.: https://github.com/tryber/sd-015-a-project-starwars-planets-search/pull/72/files */}
            {['Selecione',
              'population',
              'orbital_period',
              'diameter',
              'rotation_period',
              'surface_water']
              .filter((option) => !filters.filterByNumericValues
                .some(({ column }) => column === option))
              .map((opt) => (
                <option key={ opt } value={ opt }>
                  {(opt[0].toUpperCase() + opt.substring(1)).split('_').join(' ')}

                </option>))}
          </select>
          <select
            data-testid="comparison-filter"
            name="comparison"
            id="comparison"
            value={ filterState.comparison }
            onChange={ ({ target }) => setFilterState(
              { ...filterState, comparison: (target.value) },
            ) }

          >
            <option value="">Selecione</option>
            <option value=">">maior que</option>
            <option value="<">menor que</option>
            <option value="===">igual a</option>
          </select>
          <input
            data-testid="value-filter"
            type="number"
            name="quantity"
            id="quantity"
            value={ filterState.quantity }
            onChange={ ({ target }) => setFilterState(
              { ...filterState, quantity: (target.value) },
            ) }
          />
          <button
            data-testid="button-filter"
            type="submit"
          >
            Filtrar
          </button>
        </label>
      </form>
    </>
  );
}

export default Filters;
