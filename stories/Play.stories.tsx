import * as React from 'react';
import { storiesOf } from '@storybook/react';
import MediaPlayButton from '../src/components/buttons/MediaPlayButton';

import '../src/App.css';

storiesOf('Media Play Button', module)
  .add('default', () => <MediaPlayButton />)
  .add('when media is playing', () => <MediaPlayButton isPlaying={true} />)
  .add('when media is paused', () => <MediaPlayButton isPlaying={false} />);
