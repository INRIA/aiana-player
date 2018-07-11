import * as React from 'react';
import { FormattedMessage } from 'react-intl';

const Player = () => {
  return (
    <div className="aia-player">
      <FormattedMessage id="header.welcome" defaultMessage="Welcome" />
    </div>
  );
};

export default Player;
