import React from 'react';
import FilterByName from './FilterByName';
import FilterByNumericValues from './FilterByNumericValues';

function Filters() {
  return (
    <>
      <FilterByName />
      <FilterByNumericValues />
    </>
  );
}

export default Filters;
