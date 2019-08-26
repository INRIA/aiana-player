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

ReactDOM.render(<Aiana />, getRootElement(
  (window as any).aiana
) as HTMLElement);
