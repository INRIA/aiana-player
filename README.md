# Aiana Web Player

## What is Aiana

Aiana is a web media player meant to consume
[MOOC](https://en.wikipedia.org/wiki/Massive_open_online_course) resources. It
started as a research project at
[Inria Bordeaux](https://www.inria.fr/centre/bordeaux) in the
[POTIOC team](https://team.inria.fr/potioc/fr/). Its aim is to propose new
design principles for MOOCs in order to let people with disabilities have a
proper way to consume the contents.

The player focuses on trying to improve the general MOOC experience for people
with cognitive impairments for whom accessibility standards are far from being
established.

## How to Use it

There are two recommended ways to integrate the player when you want to use the
main channel releases.

### Integrating the JavaScript Code to Your Web Pages

This integration lets you use your own JavaScript files and use your own servers
to host it.

First, download the target version release archive.
[The "Releases" page](https://github.com/INRIA/aiana-player/releases/) is where
all archives can be downloaded from.

@TODO: link to MOOC AN

@TODO: note about styles

### Other Cases

@TODO: no native environments

## Getting Started

### Development Resources

This repository does not include development resources excepted the `index.html`
file and basic styles.

[The development resources](https://static.bordeaux.inria.fr/mooc-accessibility/aiana-player-dev-resources.zip)
are a set of static files sufficient to work offline and avoid network issues.
Simply extract the archive and copy its `dev` directory in `public`.

The player configuration set in the `index.html` file expects to find these
files and does not require any update.

### Start Development Server

1. Install development resources (see above).

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

@TODO: travis ci on tag

## Code Status

[![Build Status](https://travis-ci.com/INRIA/aiana-player.svg?branch=master)](https://travis-ci.com/INRIA/aiana-player)
