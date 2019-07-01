import { applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';

export default applyMiddleware(thunk);
