import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StarWarsContextProvider } from './context/StarWarsContext';

ReactDOM.render(
  <StarWarsContextProvider>
    <App />
  </StarWarsContextProvider>,
  document.getElementById('root'),
);
