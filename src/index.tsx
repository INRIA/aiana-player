import React from 'react';
import ReactDOM from 'react-dom';
import Aiana from './components/Aiana';
import 'focus-visible';
import './i18n';
import { CONTAINER_SELECTOR } from './constants';

function getRootElement(conf: any = {}) {
  if ('container' in conf) {
    return document.querySelector(conf.container);
  }

  return document.querySelector(CONTAINER_SELECTOR);
}

function renderApp() {
  ReactDOM.render(<Aiana />, getRootElement(
    (window as any).aiana
  ) as HTMLElement);
}

async function init() {
  if (process.env.NODE_ENV !== 'production') {
    const axe = await import('react-axe');
    axe.default(React, ReactDOM, 1000);
    renderApp();
  } else {
    renderApp();
  }
}

init();
