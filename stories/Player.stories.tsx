import { storiesOf } from '@storybook/react';
import * as React from 'react';
import Player from '../src/components/Player';

const sources = [
  {
    src: 'https://d381hmu4snvm3e.cloudfront.net/videos/w0z9Ik6mMj83/SD.mp4',
    type: 'video/mp4'
  }
];

storiesOf('Player', module)
  .add('default', () => <Player />)
  .add('with video', () => <Player mediaSources={sources} />)
  .add('with video and custom controls', () => (
    <Player mediaSources={sources} nativeControls={false} />
  ))
  .add('with video and native controls', () => (
    <Player mediaSources={sources} nativeControls={true} />
  ));
