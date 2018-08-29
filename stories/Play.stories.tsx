import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MediaPlayButton from '../src/components/buttons/MediaPlayButton';
import { injectGlobalStyles } from '../src/utils/styles';
import 'focus-visible';

injectGlobalStyles();

storiesOf('Media Play Button', module)
  .add('default', () => <MediaPlayButton />)
  .add('when media is playing', () => <MediaPlayButton isPlaying={true} />)
  .add('when media is paused', () => <MediaPlayButton isPlaying={false} />)
  .add('with actions', () => <MediaPlayButton onClick={action('clicked')} />);
