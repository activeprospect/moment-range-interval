const _ = require('lodash');


const resolutionMatch = (range, resolution, interval) => {
  if (range.start.clone().add(resolution, interval).isSameOrAfter(range.end)) {
    return interval;
  }
  return null;
};

const intervals = [
  'minutes',
  'hours',
  'days',
  'weeks',
  'months',
  'years'
];

module.exports = (range, resolution = 60) => {
  return _.find(intervals, (interval) => {
    return resolutionMatch(range, resolution, interval);
  });
};