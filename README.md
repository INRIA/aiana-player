# Aiana Player (Reloaded)

Aiana web player. Reloaded.

## `create-react-app` documentation

This project was bootstrapped with
[Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of the documentation
[here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Development resources

[Development resources](https://static.bordeaux.inria.fr/mooc-accessibility/aiana-player-dev-resources.zip)
are a set of static files sufficient to work offline and avoid network issues.
Simply unzip the archive in the `public` directory then run the application.

The player configuration set in the `index.html` file is expecting to find these
files and requires no updating.

## Test build locally

```sh
INLINE_RUNTIME_CHUNK=false npm run build
rm -rf release
mkdir release
node scripts/extract-scripts.js
```
