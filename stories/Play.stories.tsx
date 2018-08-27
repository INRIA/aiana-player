import * as React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import IntlDecorator from './IntlDecorator';
import Play from './components/buttons/Play';

import '../src/App.css';

addDecorator(IntlDecorator);

storiesOf('Play Button', module)
  .add('default', () => <Play />)
  .add('when media is playing', () => <Play isPlaying={true} />)
  .add('when media is paused', () => <Play isPlaying={false} />);
