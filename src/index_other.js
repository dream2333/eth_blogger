import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom'

import './index.css';

import App from './App';

import BasicLayout from './components_other/BasicLayout';

ReactDOM.render(
  <React.StrictMode>
    <BasicLayout/>

  </React.StrictMode>,
  document.getElementById('root')
);