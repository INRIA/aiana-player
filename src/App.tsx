import * as React from 'react';
import './App.css';
import IntlWrapper from './Components/IntlWrapper';

class App extends React.Component {
  public render() {
    return (
      <div className="aia-app">
        <IntlWrapper />
      </div>
    );
  }
}

export default App;
