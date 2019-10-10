/* eslint-disable @typescript-eslint/no-var-requires */
const Parser = require('htmlparser2').Parser;
const fs = require('fs');
const util = require('util');
const path = require('path');
const pwd = require('pwd');

const readFile = util.promisify(fs.readFile);

const releaseDirname = process.argv.slice(2)[0];

const currentDir = pwd.currentDir();
const releaseDir = path.join(currentDir, releaseDirname);

const parser = new Parser({
  onopentag(name, attribs) {
    if (name === 'script' && /\/static\/js/.test(attribs.src)) {
      const fp = path.join(__dirname, 'build', attribs.src);
      const filename = path.basename(fp);
      fs.rename(fp, path.join(releaseDir, filename), (err) => {
        throw err;
      });
    }
  }
});

readFile('build/index.html')
  .then((content) => {
    parser.write(content);
  })
  .catch((err) => {
    console.log('OOOPS', err);
  });
