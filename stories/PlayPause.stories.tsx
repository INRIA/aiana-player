import * as React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import IntlDecorator from './IntlDecorator';
import PlayPause from '../src/components/buttons/PlayPause';

import '../src/App.css';

addDecorator(IntlDecorator);

storiesOf('PlayPause', module)
  .add('default', () => <PlayPause />)
  .add('when media is playing', () => <PlayPause isPlaying={true} />)
  .add('when media is paused', () => <PlayPause isPlaying={false} />);
