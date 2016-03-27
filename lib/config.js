'use strict';

const fs = require('fs');

const Coordinate = require('./locations').Coordinate;

function load(filename) {
  const config = JSON.parse(fs.readFileSync(filename));
  config.destination = new Coordinate(config.destination.latitude, config.destination.longitude);
  return config;
}

module.exports.load = load;
