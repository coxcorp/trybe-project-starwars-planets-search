/* eslint-disable keyword-spacing */
import React, { useState, useContext, useEffect } from 'react';

import { StarWarsContext } from '../context/StarWarsContext';

function FilterByNumericValues() {
  const { data, setFilteredData, filters, setFilters } = useContext(StarWarsContext);
  const [filterState, setFilterState] = useState(
    {
      column: 'population',
      comparison: 'maior que',
      quantity: 0,
    },
  );

  function numericFilters() {
    const tamanho = filters.filterByNumericValues.length;
    const individual = filters.filterByNumericValues;
    for (let index = 0; index < tamanho; index += 1) {
      const { column, comparison, quantity } = individual[index];
      if (comparison === 'maior que') {
        const numFilter = data.filter((planeta) => (
          Number(planeta[column]) > Number(quantity)));
        setFilteredData(numFilter);
      } else if (comparison === 'menor que') {
        const numFilter = data.filter((planeta) => (
          Number(planeta[column]) < Number(quantity)));
        setFilteredData(numFilter);
      } else {
        const numFilter = data.filter((planeta) => (
          Number(planeta[column]) === Number(quantity)));
        setFilteredData(numFilter);
      }
    }
  }

  useEffect(() => {
    numericFilters();
  }, [filters, numericFilters]);

  // ref.: https://pt.stackoverflow.com/questions/226832/diferen%C3%A7a-entre-arrays
  function createColumns() {
    const activeFilters = [];
    filters.filterByNumericValues.map(({ column }) => activeFilters.push(column));
    const columnList = [
      'population',
      'orbital_period',
      'rotation_period',
      'diameter',
      'surface_water',
    ].filter((column) => (!activeFilters.includes(column))).map((option) => (
      <option
        key={ option }
      >
        { option }

      </option>));
    return columnList;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFilters({ ...filters,
      filterByNumericValues:
      [
        ...filters.filterByNumericValues, filterState,
      ] });
    numericFilters();
  }

  function handleChange({ target }) {
    setFilterState(
      { ...filterState, [target.name]: (target.value) },
    );
  }

  // if (data.length === 0) return <h1>Carregando...</h1>;
  // const tableHeaderKey = Object.keys(data[0]).filter((title) => title !== 'residents');
  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="filterByNumericValues">
          &nbsp;Comparação numérica: &nbsp;
        <select
          data-testid="column-filter"
          name="column"
          value={ filterState.column }
          onChange={ handleChange }
        >
          { createColumns() }
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ filterState.comparison }
          onChange={ handleChange }

        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          name="quantity"
          value={ filterState.quantity }
          onChange={ handleChange }
        />
        <button
          data-testid="button-filter"
          type="submit"
        >
          Filtrar
        </button>
      </label>
    </form>
  );
}

export default FilterByNumericValues;
