import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Aiana from './components/Aiana';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Aiana />, document.querySelector('#root') as HTMLElement);
registerServiceWorker();
