import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function Table() {
  const { filteredData, filters } = useContext(StarWarsContext);
  if (filteredData.length === 0) return <h1>Carregando...</h1>;
  const tableHeaderKey = Object.keys(
    filteredData[0],
  ).filter((title) => title !== 'residents');

  const teste = filteredData.filter((datum) => datum.name.includes(filters.filterByName));
  console.log(teste, filters.filterByName);
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
        {teste.map((planet) => (
          <tr key={ planet.name }>
            {tableHeaderKey.map((key) => (
              <td key={ `${planet.name}${key}` }>
                {planet[key]}
              </td>))}
          </tr>))}
      </tbody>
    </table>
  );
}

export default Table;
