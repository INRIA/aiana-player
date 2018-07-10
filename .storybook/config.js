import { configure, setAddon, addDecorator } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { withKnobs } from '@storybook/addon-knobs/react';

addDecorator(withKnobs);
setAddon(JSXAddon);

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);

function loadStories() {
  require('./welcomeStory');
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
