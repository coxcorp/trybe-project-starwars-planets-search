import React, { useContext, useEffect, useState, useCallback } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function buildHeader(planet) {
  const tableHead = Object.keys(planet);
  return (
    <thead>
      <tr>
        { tableHead.map((name) => (<th key={ name }>{ name }</th>))}
      </tr>
    </thead>
  );
}

function buildTable(planets) {
  return (
    <tbody>
      {
        planets.map((planet) => (
          <tr key={ planet.name }>
            {Object.entries(planet).map(
              (values, index) => (
                <td
                  data-testid={ (!index) ? 'planet-name' : undefined }
                  key={ values[0] }
                >
                  {values[1]}
                </td>
              ),
            )}
          </tr>
        ))
      }
    </tbody>
  );
}

const filterToRemove = (option, sort, paramValue, filterByNumericValue) => (
  filterByNumericValue.filter(
    ({ column, comparison, value }) => !(
      option === column && sort === comparison && paramValue === value),
  ));

const orderFilteredPlanet = (filteredPlanets, setFilteredPlanets, filter, setFilter) => {
  let localPlanets = [];
  if (filter.typeOrder === 'ASC') {
    localPlanets = filteredPlanets.sort(
      (firstP, secondP) => firstP[filter.sortColumn] - secondP[filter.sortColumn],
    );
  } else {
    localPlanets = filteredPlanets.sort(
      (firstP, secondP) => secondP[filter.sortColumn] - firstP[filter.sortColumn],
    );
  }
  setFilteredPlanets(localPlanets);
  setFilter({ ...filter });
};

function isRepeated(filterd, filter) {
  const { filterType, filterValue, sort } = filter;
  const isSameFilter = (filterd.column === filterType);
  const isSameSort = (filterd.comparison === sort);
  const isSameValue = (filterd.value === filterValue);
  return !(!isSameFilter || !isSameSort || !isSameValue);
}

const changeFilter = ({ newFilter, planets, filter, setFilteredPlanets }) => {
  let localPlanets = planets.filter((planet) => planet.name.includes(filter.name));
  newFilter.forEach(({ column, comparison, value }) => {
    switch (comparison) {
    case 'maior que':
      localPlanets = localPlanets.filter((planet) => +planet[column] > +value);
      break;
    case 'menor que':
      localPlanets = localPlanets.filter((planet) => +planet[column] < +value);
      break;
    case 'igual a':
      localPlanets = localPlanets.filter((planet) => +planet[column] === +value);
      break;
    default:
      break;
    }
  });
  setFilteredPlanets(localPlanets);
};

const Filters = () => {
  const planets = useContext(StarWarsContext);
  const [filter, setFilter] = useState({
    name: '',
    filterValue: 0,
    filterType: 'population',
    sort: 'maior que',
    filterByNumericValue: [],
    usedFilter: [],
    sortColumn: 'name',
    typeOrder: 'ASC',
  });
  const [filteredPlanets, setFilteredPlanets] = useState(planets);

  const handleChange = ({ target: { value, name, id } }) => {
    if (name === 'ASC-sort') {
      const typeOrder = id;
      setFilter({ ...filter, typeOrder });
      return;
    }
    setFilter({ ...filter, [name]: value });
  };

  const handleButton = () => {
    const { filterType, filterValue, sort, filterByNumericValue } = filter;
    let newFilter = [...filterByNumericValue];
    if ((newFilter.length) && isRepeated(newFilter[newFilter.length - 1], filter)) return;
    newFilter = [...newFilter.filter((element) => element.column !== filterType),
      { column: filterType, comparison: sort, value: filterValue }];
    setFilter({ ...filter, filterByNumericValue: newFilter });
    changeFilter({ newFilter, planets, filter, setFilteredPlanets });
  };

  useEffect(() => {
    setFilteredPlanets(planets);
  }, [planets]);

  const filterByNameOnly = useCallback(() => {
    let newPlanets = planets;
    if (filter.name) {
      newPlanets = newPlanets.filter(
        (planet) => planet.name.toUpperCase().includes(filter.name.toUpperCase()),
      );
    }
    setFilteredPlanets(newPlanets);
  }, [planets, setFilteredPlanets, filter]);

  const handleFilter = (option, sort, paramValue) => {
    const { filterByNumericValue } = filter;
    const newFiltered = filterToRemove(option, sort, paramValue, filterByNumericValue);
    setFilter({ ...filter, filterByNumericValue: newFiltered });
  };

  const filterSelected = () => {
    const { filterByNumericValue } = filter;
    return filterByNumericValue.map(({ column, comparison, value }) => (
      <div data-testid="filter" key="column">
        <button type="button" onClick={ () => handleFilter(column, comparison, value) }>
          X
        </button>
        <p>{ `${column} ${comparison} ${value}` }</p>
      </div>
    ));
  };

  useEffect(() => {
    if (planets.length && !filter.filterByNumericValue.length) filterByNameOnly();
  }, [filter.name, filter.filterByNumericValue, filterByNameOnly, planets]);
  return ((!planets.length) ? <div>Loading..</div> : (
    <div>
      <input
        type="text"
        name="name"
        data-testid="name-filter"
        value={ filter.name }
        onChange={ handleChange }
      />
      <select
        name="filterType"
        id=""
        data-testid="column-filter"
        onChange={ handleChange }
      >
        {['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']
          .filter((option) => !filter.filterByNumericValue.some(
            ({ column }) => column === option,
          )).map((opt) => (<option key={ opt } value={ opt }>{opt}</option>))}
      </select>
      <select
        name="sort"
        id=""
        data-testid="comparison-filter"
        onChange={ handleChange }
      >
        {['maior que', 'menor que', 'igual a']
          .map((opt) => (<option key={ opt } value={ opt }>{opt}</option>))}
      </select>
      <button type="button" data-testid="button-filter" onClick={ handleButton }>
        Adicionar
      </button>
      <input
        type="number"
        name="filterValue"
        data-testid="value-filter"
        value={ filter.filterValue }
        onChange={ handleChange }
      />
      <label htmlFor="sort-column">
        Ordenar
        <select
          name="sortColumn"
          id="sort-column"
          data-testid="column-sort"
          onChange={ handleChange }
        >
          {
            ['name', 'rotation_period', 'orbital_period', 'diameter',
              'climate', 'gravity', 'terrain', 'surface_water', 'population']
              .filter((newOption) => !filter.filterByNumericValue.some(
                ({ column }) => column === newOption,
              )).map((opt) => (<option key={ opt } value={ opt }>{opt}</option>))
          }
        </select>
        <label htmlFor="ASC">
          Ascendente
          <input
            type="radio"
            name="ASC-sort"
            id="ASC"
            data-testid="column-sort-input-asc"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="DESC">
          Descendente
          <input
            type="radio"
            name="ASC-sort"
            id="DESC"
            data-testid="column-sort-input-desc"
            onChange={ handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => (
            orderFilteredPlanet(filteredPlanets, setFilteredPlanets, filter, setFilter)) }
        >
          Ordenar
        </button>
      </label>
      { !!filter.filterByNumericValue.length && filterSelected()}
      <table>
        {buildHeader(planets[0])}
        {!!filteredPlanets.length && buildTable(filteredPlanets)}
      </table>
    </div>
  ));
};

export default Filters;
