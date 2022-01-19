import React, { useContext, useRef, useState } from 'react';

import { StarWarsContext } from '../context/StarWarsContext';

function FilterByOrder() {
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'asc',
  });
  const {
    newList,
    setNewList,
  } = useContext(StarWarsContext);

  const selectColumn = useRef();

  const numberOne = 1;

  const sortByColumn = () => {
    if (order.sort === 'asc') {
      const test = newList.sort((a, b) => {
        if (Number(a[order.column]) > Number(b[order.column])) {
          return numberOne;
        }
        if (Number(a[order.column]) < Number(b[order.column])) {
          return -numberOne;
        }
        return 0;
      });
      setNewList([...test]);
    }
    // };
    if (order.sort === 'des') {
      const test = newList.sort((a, b) => {
        if (Number(a[order.column]) < Number(b[order.column])) {
          return numberOne;
        }
        if (Number(a[order.column]) > Number(b[order.column])) {
          return -numberOne;
        }
        return 0;
      });
      setNewList([...test]);
    }
  };
  function handleSubmit(event) {
    event.preventDefault();
    console.log(order);
    sortByColumn();
  }

  function handleChange({ target }) {
    setOrder({ ...order, sort: target.value });
  }

  function handleChange2({ target }) {
    setOrder({ ...order, column: target.value });
  }

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="selectColumn">
      &nbsp;Ordenação: &nbsp;
        <select
          data-testid="column-sort"
          id="selectColumn"
          ref={ selectColumn }
          onChange={ handleChange2 }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="asc">
        &nbsp;ASC &nbsp;
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          id="asc"
          name="sortFilter"
          value="asc"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="des">
        &nbsp;DES &nbsp;
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          id="des"
          name="sortFilter"
          value="des"
          onChange={ handleChange }
        />
      </label>
      <button
        type="submit"
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
    </form>
  );
}

export default FilterByOrder;
