import React from 'react';
import ReactDOM from 'react-dom';
import axe from 'react-axe';
import { renderApp } from './utils/application';

axe(React, ReactDOM, 1000);
renderApp();
