/* eslint-disable @typescript-eslint/no-var-requires */
const Parser = require('htmlparser2').Parser;
const fs = require('fs');
const util = require('util');
const path = require('path');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const releaseDirname = process.argv.slice(2)[0];

const currentDir = process.cwd();
const releaseDir = path.join(currentDir, releaseDirname);

readFile(path.join(currentDir, 'build/index.html'))
  .then((content) => {
    const filenames = [];

    const parser = new Parser({
      onopentag(name, attribs) {
        if (name === 'script' && /\/static\/js/.test(attribs.src)) {
          const fp = path.join(currentDir, 'build', attribs.src);
          const filename = path.basename(attribs.src);

          filenames.push(filename);

          fs.copyFile(fp, path.join(releaseDir, filename), (err) => {
            if (err) {
              console.error(err);
              process.exit(1);
            }

            console.log(`Copied ${filename} to release directory.`);
          });
        }
      }
    });

    parser.write(content);

    return filenames;
  })
  .then((filenames) => {
    const manifestPath = path.join(releaseDir, 'manifest.yml');

    const manifestContent = filenames
      .map((filename) => `- ${filename}\n`)
      .join('');

    return writeFile(manifestPath, manifestContent);
  })
  .then(() => {
    console.log('Manifest written to release directory.\n\nAll done!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
