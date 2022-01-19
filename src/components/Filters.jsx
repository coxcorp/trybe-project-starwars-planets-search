import React from 'react';
import FilterByName from './FilterByName';
import FilterByNumericValues from './FilterByNumericValues';
import FilterByOrder from './FilterByOrder';

function Filters() {
  return (
    <>
      <FilterByName />
      <FilterByNumericValues />
      <FilterByOrder />
    </>
  );
}

export default Filters;
