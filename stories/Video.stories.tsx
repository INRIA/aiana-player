import { storiesOf } from '@storybook/react';
import * as React from 'react';
import VideoPlayer from '../src/components/video/VideoPlayer';

const sources = [
  {
    src: 'https://d381hmu4snvm3e.cloudfront.net/videos/w0z9Ik6mMj83/SD.mp4',
    type: 'video/mp4'
  }
];

storiesOf('Video Player', module)
  .add('default', () => <VideoPlayer />)
  .add('with media', () => <VideoPlayer sources={sources} />)
  .add('with default controls', () => (
    <VideoPlayer sources={sources} controls={true} />
  ))
  .add('with autoplay', () => (
    <VideoPlayer sources={sources} autoPlay={true} />
  ));
