import React, { useContext } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function Table() {
  const { data } = useContext(StarWarsContext);
  if (data.length === 0) return <h1>Carregando...</h1>;
  const tableHeaderKey = Object.keys(data[0]).filter((title) => title !== 'residents');
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
        {data.map((planet) => (
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
