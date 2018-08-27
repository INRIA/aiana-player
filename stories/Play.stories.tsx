import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Play from '../src/components/buttons/Play';

import '../src/App.css';

storiesOf('Play Button', module)
  .add('default', () => <Play />)
  .add('when media is playing', () => <Play isPlaying={true} />)
  .add('when media is paused', () => <Play isPlaying={false} />);
