# Aiana Web Player

## What is Aiana

Aiana is a web media player meant to consume
[MOOC](https://en.wikipedia.org/wiki/Massive_open_online_course) resources. It
started as a research project at
[Inria Bordeaux](https://www.inria.fr/centre/bordeaux) in the
[POTIOC team](https://team.inria.fr/potioc/fr/). Its aim is to propose new
design principles for MOOCs in order to let people with disabilities have a
better experience when consuming the contents.

The player focuses on trying to improve the general MOOC experience for people
with cognitive impairments for whom accessibility standards are far from being
established.

---

## How to Use it

There are two recommended ways to integrate the player when you want to use the
main channel releases.

### Integrating the JavaScript Code to Your Web Pages

This integration lets you use your own JavaScript files and use your own servers
to host it.

1. Download the target version release archive.
   [The "Releases" page](https://github.com/INRIA/aiana-player/releases/) is
   where all archives can be downloaded from.

2. Extract scripts so they can be accessed from your pages. For example,
   `/public/js`, at the root of your web server.

3. Add an element with `id="root"` to your pages. The player will load its
   content inside this element, so it is important that is remains empty, unless
   of course you want to overwrite its content.

4. Update your pages by adding `<script>` tags to include the JavaScript files.

[The Inria MOOC about digital accessibility](https://mooc-accessibility.inria.fr/course/)
courses are made this way and may be a good example to get started.

#### Fallback

To provide content to the users who do not have JavaScript enabled, we recommend
that you use a `noscript` tag containing a `video` tag.

`public/index.html` file does provide an example of what can be provided as a
fallback.

#### A Note About Styles

Needed styles are contained within the application using
[styled components](https://www.styled-components.com/), and you should not need
to override them.

### Other Use Cases

If you intend on using this player in a native environment
([React Native](https://facebook.github.io/react-native/)), please note that the
player was not architectured to be used outside a web browser.

It may work, but some unexpected problems may happen and no support will be
provided.

---

## Development

### Development Resources

This repository does not include development resources excepted the `index.html`
file and basic styles.

[The development resources](https://static.bordeaux.inria.fr/mooc-accessibility/aiana-player-dev-resources.zip)
are a set of static files sufficient to work offline and avoid network issues.
Simply extract the archive and copy its `dev` directory in `public`.

The player configuration set in the `index.html` file expects to find these
files and does not require any update.

### Start Development Server

1. Install development resources.

2. Install `npm` dependencies:

   `npm install`

3. Run development server:

   `npm run start`

4. Go to `http://localhost:3000`.

5. Follow the guidelines to start developing. You may find the following
   resources handy:
   - [React](https://reactjs.org/)
   - [Create React App](https://create-react-app.dev/docs/getting-started/)
   - [Cypress](https://www.cypress.io/)
   - [Jest](https://jestjs.io/)

## Create a Release

### Test Build Locally

```sh
INLINE_RUNTIME_CHUNK=false npm run build
rm -rf release
mkdir release
node scripts/extract-scripts.js
```

### Continuous Integration

[Travis CI](https://travis-ci.com) is used as continuous integration platform.

Whenever a Git tag is pushed, Travis will perform tests and build an archive
containing the files to be included in web pages.

Note that due to a `react-scripts` limitation and the will to not `eject` the
project, a `manifest.yml` file is included to know what files are necessary to
load the player.

Releases can be found on
[the project release page](https://github.com/INRIA/aiana-player/releases).

Note that there is a
[static link to the latest release](https://github.com/INRIA/aiana-player/releases/latest)
which is used for website deployment.

## Code Status

[![Build Status](https://travis-ci.com/INRIA/aiana-player.svg?branch=master)](https://travis-ci.com/INRIA/aiana-player)
