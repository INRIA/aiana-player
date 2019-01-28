import * as React from 'react';

class Resizers extends React.Component {
  public render() {
    return (
      <div>
        <div
          style={{
            backgroundColor: 'red',
            cursor: 'ns-resize',
            height: '4px',
            left: '1em',
            position: 'absolute',
            top: 0,
            width: 'calc(100% - 2em)'
          }}
        />

        <div
          style={{
            backgroundColor: 'red',
            bottom: 0,
            cursor: 'ns-resize',
            height: '4px',
            left: '1em',
            position: 'absolute',
            width: 'calc(100% - 2em)'
          }}
        />

        <div
          style={{
            backgroundColor: 'red',
            cursor: 'ew-resize',
            height: 'calc(100% - 2em)',
            left: 0,
            position: 'absolute',
            top: '1em',
            width: '4px'
          }}
        />

        <div
          style={{
            backgroundColor: 'red',
            cursor: 'ew-resize',
            height: 'calc(100% - 2em)',
            position: 'absolute',
            right: 0,
            top: '1em',
            width: '4px'
          }}
        />
      </div>
    );
  }
}

export default Resizers;
