import React from 'react';
import ReactDOM from 'react-dom';
import Aiana from './components/Aiana';
import registerServiceWorker from './registerServiceWorker';

import 'focus-visible';
import './i18n';

ReactDOM.render(<Aiana />, document.querySelector('#root') as HTMLElement);
registerServiceWorker();
