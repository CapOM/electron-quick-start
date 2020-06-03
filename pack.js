const pjson = require('./package.json');
const path = require('path');
const fs = require('fs');
const builder = require('electron-builder');
const download = require('electron-download');
const extractZip = require('extract-zip');
const rimraf = require('rimraf').sync;
const { Platform } = builder;

const electronPath = path.join(__dirname, 'downloaded_electron');

const downloadElectron = () => {
  return new Promise((resolve, reject) => {
    rimraf(electronPath);
    fs.mkdirSync(electronPath);

    download({
      version: pjson.devDependencies.electron,
      arch: 'x64',
      platform: 'darwin',
      force: true,
    }, function (err, zipPath) {
      if (err != null) return reject(err);

      extractZip(zipPath, { dir: electronPath }, function (err) {
        if (err != null) return reject(err);
        return resolve();
      });
    });
  });
};


const build = () => {
  const buildOpts = {
    targets: Platform.MAC.createTarget(['zip']),
    config: {
      productName: 'MyApp',
      electronDist: electronPath,
      directories: {
        output: 'package',
      },
      files: [
        'index.html',
        'main.js',
        '!node_modules/**/*',
      ],
      mac: {
        gatekeeperAssess: false,
        hardenedRuntime: true,
      },
      publish: undefined,
    }
  };

  return builder.build(buildOpts)
};

downloadElectron().then(function() {
  return build();
}).then(() => {
  console.log('Successfully packaged zip');
  process.exit(0);
})
.catch((err) => {
  console.log('Could not package the application');
  console.log(err);
  process.exit(1);
});
