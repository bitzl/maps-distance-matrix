'use strict';

const
  expect = require('chai').expect,
  Coordinate = require('../lib/locations').Coordinate,
  Row = require('../lib/repository').Row;

const data = [
  new Coordinate(42.3, 11.2),
  'First address', {
    status: "OK",
    duration: {
      value: 340110,
      text: "3 jours 22 heures"
    },
    distance: {
      value: 1734542,
      text: "1 735 km"
    }
  }
];


describe('Repository', function() {
  let row = null;
  beforeEach(function () {
    row = new Row(data);
  })
  describe('Row', function() {
    context('when status is requested', function() {
      it('returns the right value.', function() {
        expect(row.getStatus()).to.equal('OK');
      })
    })
    context('when origin latitude is requested', function() {
      it('should return the correct value.', function() {
        expect(row.getOriginLatitude()).to.equal(42.3);
      })
    })
    context('when origin longitude is requested', function() {
      it('should return the correct value.', function() {
        expect(row.getOriginLongitude()).to.equal(11.2);
      })
    })
    context('when origin address is requested', function() {
      it('should return the correct value.', function() {
        expect(row.getOriginAddress()).to.equal("First address");
      })
    })
    context('when duration is requested', function() {
      it('should return the correct value.', function() {
        expect(row.getDuration()).to.equal(340110);
      })
      it('should return null if there is none.', function() {
        row = new Row([null, null, { status: 'ERROR'}]);
        expect(row.getDuration()).to.be.null;
      })
    })
    context('when duration text is requested', function() {
      it('should return the correct value.', function() {
        expect(row.getDurationText()).to.equal('3 jours 22 heures');
      })
      it('should return null if there is none.', function() {
        row = new Row([null, null, { status: 'ERROR'}]);
        expect(row.getDurationText()).to.be.null;
      })
    })
    context('when distance is requested', function() {
      it('should return the correct value.', function() {
        expect(row.getDistance()).to.equal(1734542);
      })
      it('should return null if there is none.', function() {
        row = new Row([null, null, { status: 'ERROR'}]);
        expect(row.getDistance()).to.be.null;
      })
    })
    context('when distance text is requested', function() {
      it('should return the value.', function() {
        expect(row.getDistanceText()).to.equal('1 735 km');
      })
      it('should return null if there is none.', function() {
        row = new Row([null, null, { status: 'ERROR'}]);
        expect(row.getDistanceText()).to.be.null;
      })
    })
  })
});
