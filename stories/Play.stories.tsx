import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import 'focus-visible';
import * as React from 'react';
import MediaPlayButton from '../src/components/buttons/MediaPlayButton';
import { injectGlobalStyles } from '../src/utils/global-styles';

injectGlobalStyles();

storiesOf('Media Play Button', module)
  .add('default', () => <MediaPlayButton />)
  .add('when media is playing', () => <MediaPlayButton isPlaying={true} />)
  .add('when media is paused', () => <MediaPlayButton isPlaying={false} />)
  .add('with actions', () => <MediaPlayButton onClick={action('clicked')} />);
