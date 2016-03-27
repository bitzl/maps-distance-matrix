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
  if (process.argv.length !== 3) {
    console.log('Usage: node index.js <config>');
    process.exit(1);
  }

  const options = config.load(process.argv[2]);

  // start processing...
  const apiKey = options.apiKey;
  const origins = locations.randomSample(options.samples, options.range);
  const destinations = [options.destination];
  distanceApi.query(origins, destinations, apiKey, function (error, data) {
    if (error) {
      console.log('Error:', error);
      return;
    }
    repository.save(options.file, origins, data);
    console.log('Done.')
  });
}

if (require.main === module) {
  main();
}
