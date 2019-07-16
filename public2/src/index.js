import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import '../growth/css/bootstrap4-growth.min.css'

const title = "Hello world I'm so fat";

ReactDOM.render(
  <App title={title} />,
  document.getElementById('app')
);

module.hot.accept();