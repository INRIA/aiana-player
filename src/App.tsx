import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div className="aia-player">
        <FormattedMessage id="header.welcome" defaultMessage="Welcome" />
      </div>
    );
  }
}

export default App;
