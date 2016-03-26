'use strict';


class Coordinate {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  toString() {
    return this.latitude + "," + this.longitude;
  }
}

function randomOrdinate(min, max) {
  return min + (max - min) * Math.random();
}

function randomCoordinate(latitudeMin, latitudeMax, longitudeMin, longitudeMax) {
  const latitude = randomOrdinate(latitudeMin, latitudeMax);
  const longitude = randomOrdinate(longitudeMin, longitudeMax);
  return new Coordinate(latitude, longitude);
}

function randomSample(count, range) {
  const coordinates = []
  for (let i = 0; i < count; i++) {
    coordinates.push(randomCoordinate(range.latitude[0], range.latitude[1], range.longitude[0], range.longitude[1]));
  }
  return coordinates;
}


module.exports.randomOrdinate = randomOrdinate;
module.exports.randomCoordinate = randomCoordinate;
module.exports.randomSample = randomSample;
module.exports.Coordinate = Coordinate;
