import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Aiana from './components/Aiana';
import middleware from './middleware';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

export interface IState {
  player: any;
}

const initialState: IState = {
  player: {
    isFullscreen: false,
    isPlaying: false,
    playerElement: null,
    videoElement: null
  }
};

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <Aiana />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
