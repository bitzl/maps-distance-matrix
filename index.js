'use strict';

const _ = require('lodash'),
  commander = require('commander'),
  util = require('util'),
  distanceApi = require('./lib/distanceApi'),
  locations = require('./lib/locations'),
  config = require('./lib/config'),
  repository = require('./lib/repository');

function main() {
  const packageInfo = require('./package.json');
  // commander
  //   .version(packageInfo.version)
  //   // .option('-o, --out <file>', 'Write to <file>. If <file> exists, append new data.')
  //   // .option('-n, --samples <count>', 'The number of samples to request (default: 30).', 30)
  //   // .option('-k, --apikey <key>', 'The Google Distance API key.')
  //   .parse(process.argv);
  //
  // if (process.argv.length < 3) {
  //   commander.help();
  // }

  const options = config.load('job.json');

  // start processing...
  const apiKey = options.apiKey;
  const origins = locations.randomSample(options.samples, options.range);
  const destinations = [options.destination];
  distanceApi.query(origins, destinations, apiKey, function (error, data) {
    if (error) {
      console.log(error);
      return;
    }
    repository.save(options.file, origins, data);
    console.log('Done.')
  });
}

if (require.main === module) {
  main();
}
