import React, { useContext, useEffect, useState } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function Table() {
  const { filteredData, filters, newList, setNewList } = useContext(StarWarsContext);
  const [tableHeaderKey, setTableHeaderKey] = useState([]);

  useEffect(() => {
    if (filteredData.length > 0) {
      setNewList(
        filteredData
          .filter((datum) => datum.name.includes(filters.filterByName)),
      );
    }
  }, [filteredData, filters.filterByName, setNewList]);

  useEffect(() => {
    if (filteredData.length > 0) {
      setTableHeaderKey(
        Object.keys(
          filteredData[0],
        ).filter((title) => title !== 'residents'),
      );
    }
  }, [filteredData, filters.filterByNumberValue]);

  function createTD(planet, key) {
    if (key === 'name') {
      return (
        <td
          data-testid="planet-name"
          key={ `${planet.name}${key}` }
        >
          {planet[key]}
        </td>
      );
    }
    return (
      <td
        key={ `${planet.name}${key}` }
      >
        {planet[key]}
      </td>);
  }

  if (filteredData.length === 0) return <h1>Carregando...</h1>;
  return (
    <table>
      <thead>
        <tr>
          {tableHeaderKey.map((key) => (
            <th key={ key }>
              {((key[0].toUpperCase() + key.substring(1)).split('_').join(' '))}
            </th>))}
        </tr>
      </thead>
      <tbody>
        {newList.map((planet) => (
          <tr key={ planet.name }>
            {tableHeaderKey.map((key) => (
              createTD(planet, key)
            ))}
          </tr>))}
      </tbody>
    </table>
  );
}

export default Table;
