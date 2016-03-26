'use strict';

const fs = require('fs');

const Coordinate = require('./locations').Coordinate;

function loadConfig(filename) {

  const config = JSON.parse(fs.readFileSync(filename));
  console.log(JSON.stringify(config));
  config.destination = new Coordinate(config.destination.latitude, config.destination.longitude);
  return config;
}

module.exports = loadConfig;
