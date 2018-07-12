import * as React from 'react';
import PlayPause from '../buttons/PlayPause';

class Controls extends React.Component {
  public render() {
    return (
      <div className="aiana-control">
        <PlayPause />
      </div>
    );
  }
}

export default Controls;
