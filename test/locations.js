"use strict";

const expect = require('chai').expect,
    locations = require('../lib/locations');

describe('locations', function() {
   describe('generate random ordinates', function() {
     context('when min and max is given', function() {
       it('return only values in range.', function() {
         for (let i = 0; i < 100; i++) {
           expect(locations.randomOrdinate(12, 17)).to.be.within(12, 17);
         }
       });
       it('should return different values.', function() {
         const first = locations.randomOrdinate(12, 17);
         const second = locations.randomOrdinate(12, 17);
         expect(first).to.not.equal(second);
       });
     });
   });
   describe('generate random coordinates', function() {
     context('when index is called', function() {
       it('return only values in range.', function() {
         for (let i = 0; i < 100; i++) {
           const coordinate = locations.randomCoordinate(12, 17, 50, 60)
           expect(coordinate.latitude).to.be.within(12, 17);
           expect(coordinate.longitude).to.be.within(50, 60);
         }
       });
       it('should return different values.', function() {
         const first = locations.randomCoordinate(12, 17);
         const second = locations.randomCoordinate(12, 17);
         expect(first).to.not.deep.equal(second);
       });
     });
   });
   describe('Coordinate', function() {
     context('when toString is called', function() {
       it('should return a string containg latitude and longitude', function() {
         const coordinate = new locations.Coordinate(12.3, 15.3);
         expect(coordinate.toString()).to.equal("12.3,15.3");
       });
     });
   });
 });
