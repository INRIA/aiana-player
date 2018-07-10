import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.css';

import IntlWrapper from './IntlWrapper';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<IntlWrapper />, document.getElementById('root'));
registerServiceWorker();
