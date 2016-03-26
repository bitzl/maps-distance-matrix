'use strict';

const _ = require('lodash'),
    needle = require('needle');

function coordinateToString(coordinate) {
  return coordinate.latitude + ',' + coordinate.longitude;
}

function coordinatesToString(coordinates) {
  return _.join(_.map(coordinates, coordinateToString), '|');
}

function query(origins, destinations, apiKey, callback) {
  const url = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
    + 'key=' + apiKey
    + '&mode=transit'
    + '&origins=' + coordinatesToString(origins)
    + '&destinations=' + coordinatesToString(destinations)
    + '&units=metric';
  needle.get(url, function (error, response) {
    console.log(response.statusCode, typeof(response.statusCode));
    if (!error && response.statusCode == 200) {
      callback(response.body, null);
    }
    callback(error, response.body);
  });
}

module.exports.query = query;
module.exports.coordinateToString = coordinateToString;
module.exports.coordinatesToString = coordinatesToString;
