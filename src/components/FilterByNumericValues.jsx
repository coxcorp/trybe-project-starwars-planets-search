import React, { useState, useContext } from 'react';

import { StarWarsContext } from '../context/StarWarsContext';

function FilterByNumericValues() {
  const { data, setData, filters, setFilters } = useContext(StarWarsContext);
  const [filterState, setFilterState] = useState(
    {
      column: 'population',
      comparison: 'maior que',
      quantity: 0,
    },
  );
  if (data.length === 0) return <h1>Carregando...</h1>;

  // ref.: https://pt.stackoverflow.com/questions/226832/diferen%C3%A7a-entre-arrays
  function createColumns() {
    const activeFilters = [];
    filters.filterByNumericValues.map(({ column }) => activeFilters.push(column));
    const columnList = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ].filter((column) => (!activeFilters.includes(column))).map((option) => (
      <option
        key={ option }
      >
        { option }

      </option>));
    return columnList;
  }

  function numericFilters() {
    const tamanho = filters.filterByNumericValues.length;
    const individual = filters.filterByNumericValues;
    for (let index = 0; index < tamanho - 1; index += 1) {
      const { column, comparison, quantity } = individual[index];
      if (comparison === 'maior que') {
        const test = data.filter((planeta) => (planeta[column] > quantity));
        setData(test);
        console.log(data);
      } else if (comparison === 'menor que') {
        const test = data.filter((planeta) => (planeta[column] < quantity));
        setData(test);
      } else {
        const test = data.filter((planeta) => (planeta[column] === quantity));
        setData(test);
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFilters({ filterByNumericValues:
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
    <>
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
      {/* <table>
        <thead>
          <tr>
            {tableHeaderKey.map((key) => (
              <th key={ key }>
                {((key[0].toUpperCase() + key.substring(1)).split('_').join(' '))}
              </th>))}
          </tr>
        </thead>
        <tbody>
          {data.map((planet) => (
            <tr key={ planet.name }>
              {tableHeaderKey.map((key) => (
                <td key={ `${planet.name}${key}` }>
                  {planet[key]}
                </td>))}
            </tr>))}
        </tbody>
      </table> */}
    </>
  );
}

export default FilterByNumericValues;
