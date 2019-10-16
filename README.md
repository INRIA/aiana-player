# Aiana Player (Reloaded)

Aiana web player. Reloaded.

## `create-react-app` documentation

This project was bootstrapped with
[Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of the documentation
[here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Test build locally

```sh
INLINE_RUNTIME_CHUNK=false npm run build
rm -rf release
mkdir release
node scripts/extract-scripts.js
```
