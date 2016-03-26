'use strict';

const _ = require('lodash'),
  commander = require('commander'),
  util = require('util'),
  distanceApi = require('./lib/distanceApi'),
  locations = require('./lib/locations'),
  loadConfig = require('./lib/config');

function main() {
  const packageInfo = require('./package.json');
  commander
    .version(packageInfo.version)
    // .option('-o, --out <file>', 'Write to <file>. If <file> exists, append new data.')
    .option('-n, --samples <count>', 'The number of samples to request (default: 30).', 30)
    .option('-k, --apikey <key>', 'The Google Distance API key.')
    .parse(process.argv);

  if (process.argv.length < 3) {
    commander.help();
  }

  const config = loadConfig('job.json');

  // start processing...
  const apiKey = commander.apiKey;
  const origins = locations.randomSample(commander.samples, config.range);
  const destinations = [config.destination];
  distanceApi.query(origins, destinations, apiKey, function (error, data) {
    if (error) {
      console.log(error);
      return;
    }
    const rows = data.rows;
    save(flatten(rows));
    for (let row in rows) {
      console.log(util.inspect(rows[row].elements[0].distance));
    }
  });
}

if (require.main === module) {
  main();
}
