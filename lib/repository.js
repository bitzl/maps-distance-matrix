'use strict';

const _ = require('lodash'),
  fs = require('fs'),
  util = require('util');

const HEADER = 'originLongitude,originLongitude,originAddress,status,distance,distanceText,duration,durationText\n';

function writeHeader(filename) {
  fs.writeFileSync(filename, HEADER);
}

function appendContent(filename, content) {
  fs.appendFileSync(filename, content);
}

class Row {
  constructor(row) {
    this.row = row;
  }
  getStatus() {
    if (!this.row[2]) {
      console.log('No Status:', this.row);
    }
    return this.row[2].status;
  }
  getOriginLatitude() {
    return this.row[0].latitude;
  }
  getOriginLongitude() {
    return this.row[0].longitude;
  }
  getOriginAddress() {
    return this.row[1];
  }
  getDuration() {
    if (this.getStatus() !== 'OK') {
      return null;
    }
    return this.row[2].duration.value;
  }
  getDurationText() {
    if (this.getStatus() !== 'OK') {
      return null;
    }
    return this.row[2].duration.text;
  }
  getDistance() {
    if (this.getStatus() !== 'OK') {
      return null;
    }
    return this.row[2].distance.value;
  }
  getDistanceText() {
    if (this.getStatus() !== 'OK') {
      return null;
    }
    return this.row[2].distance.text;
  }
}

function createContent(origins, data) {
  const lines = [];
  const rows = _.map(
    _.zip(origins, data.origin_addresses,
      _.map(data.rows, function (row) {
        return row.elements[0];
      }
    )), function (row) {
      return new Row(row);
    });
  _.forEach(rows, function (row) {
    const line = _.join([
      row.getOriginLongitude(),
      row.getOriginLongitude(),
      row.getOriginAddress(),
      row.getStatus(),
      row.getDistance(),
      row.getDistanceText(),
      row.getDuration(),
      row.getDurationText()
    ], ',');
    lines.push(line);
  });
  return _.join(lines, '\n');
}

function save(filename, origins, data) {
  if (!fs.existsSync(filename)) {
    writeHeader(filename);
  }
  appendContent(filename, createContent(origins, data));
}

module.exports.save = save;
module.exports.Row = Row;
