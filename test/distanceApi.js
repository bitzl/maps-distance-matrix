"use strict";

var expect = require('chai').expect,
    distanceApi = require('../lib/distanceApi'),
    Coordinate = require('../lib/locations').Coordinate;

describe('distanceApi', function() {
  describe('convert coordinates to query strings', function() {
    context('when a coordinate is given', function() {
      it('should return a valid string.', function() {
        const string = distanceApi.coordinateToString(new Coordinate(123.4, 32.1));
        expect(string).to.equal('123.4,32.1');
      });
    });
  });
  describe('convert multiple coordinates to a list', function() {
    context('when a list of coordinates is given', function() {
      it('should return a valid string.', function() {
        const coordinates = [
          new Coordinate(123.4, 32.1),
          new Coordinate(1.4, 24.1),
          new Coordinate(2.1, 34.4)
        ];
        const expectedString = '123.4,32.1|1.4,24.1|2.1,34.4'
        expect(distanceApi.coordinatesToString(coordinates)).to.equal(expectedString);
      });
    });
  });
});
