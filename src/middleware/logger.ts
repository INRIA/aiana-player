import { Action, Store } from 'redux';

const logger = (store: Store) => (next: (action: Action) => any) => (
  action: Action
) => {
  console.group(action.type);
  console.log('action:', action);
  const result = next(action);
  console.log('new state:', store.getState());
  console.groupEnd();

  return result;
};

export default logger;
