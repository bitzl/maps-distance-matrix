'use strict';

const _ = require('lodash'),
  commander = require('commander');
  util = require('util'),
  distanceApi = require('./lib/distanceApi'),
  locations = require('./lib/locations');

function main() {
  const packageInfo = require('./package.json');
  commander
    .version(packageInfo.version)
    // .option('-o, --out <file>', 'Write to <file>. If <file> exists, append new data.')
    .option('-k, --apikey <key>', 'The Google Distance API key.')
    .parse(process.argv);
  if (process.argv.length < 3) {
    commander.help();
  }

  // start processing...
  const apiKey = commander.apiKey;
  const origins = locations.randomSample(30, 48.1, 48.2, 11.5, 11.6);
  const destinations = [new locations.Coordinate(48.137493, 11.575363)];
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
