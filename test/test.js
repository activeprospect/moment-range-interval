const assert      = require('chai').assert,
      moment      = require('moment-range').extendMoment(require('moment')),
      getInterval = require('../');


describe('Interval', () => {

  it('should never select unit smaller than minutes', () => {
    assert.equal(getInterval(moment.range('2017-10-24T00:01:00.000', '2017-10-24T00:01:30.000')), 'minutes');
  });

  it('should select minutes for range spanning multiple minutes', () => {
    assert.equal(getInterval(moment.range('2017-10-24T00:01:00.000', '2017-10-24T00:04:00.000')), 'minutes');
  });

  it('should select minutes for exactly one hour', () => {
    assert.equal(getInterval(moment.range('2017-10-24T01:00:00.000', '2017-10-24T02:00:00.000')), 'minutes');
  });

  it('should select hours for just over one hour', () => {
    assert.equal(getInterval(moment.range('2017-10-24T01:00:00.000', '2017-10-24T02:01:00.000')), 'hours');
  });

  it('should select hours for range spanning multiple hours', () => {
    assert.equal(getInterval(moment.range('2017-10-24T01:00:00.000', '2017-10-24T04:00:00.000')), 'hours');
  });

  it('should select hours for exactly 60 hours', () => {
    assert.equal(getInterval(moment.range('2017-10-24T00:00:00.000', '2017-10-26T12:00:00.000')), 'hours');
  });

  it('should select days for range just over 60 hours', () => {
    assert.equal(getInterval(moment.range('2017-10-24T00:00:00.000', '2017-10-26T12:00:01.000')), 'days');
  });

  it('should select days for range over 60 hours', () => {
    assert.equal(getInterval(moment.range('2017-10-24T00:00:00.000', '2017-10-27T00:00:00.000')), 'days');
  });

  it('should select weeks for range just over 60 days', () => {
    const start = moment('2017-10-24T00:00:00.000');
    const end = start.clone().add(60, 'days').add(1, 'second');
    assert.equal(getInterval(moment.range(start, end)), 'weeks');
  });

  it('should select weeks for range over 60 days', () => {
    const start = moment('2017-10-24T00:00:00.000');
    const end = start.clone().add(61, 'days');
    assert.equal(getInterval(moment.range(start, end)), 'weeks');
  });

  it('should select months for range just over 60 weeks', () => {
    const start = moment('2017-10-24T00:00:00.000');
    const end = start.clone().add(60, 'weeks').add(1, 'second');
    assert.equal(getInterval(moment.range(start, end)), 'months');
  });

  it('should select months for range over 60 weeks', () => {
    const start = moment('2017-10-24T00:00:00.000');
    const end = start.clone().add(61, 'weeks');
    assert.equal(getInterval(moment.range(start, end)), 'months');
  });

  it('should select years for range just over 60 months', () => {
    const start = moment('2017-10-24T00:00:00.000');
    const end = start.clone().add(60, 'months').add(1, 'second');
    assert.equal(getInterval(moment.range(start, end)), 'years');
  });

  it('should select years for range over 60 months', () => {
    const start = moment('2017-10-24T00:00:00.000');
    const end = start.clone().add(61, 'months');
    assert.equal(getInterval(moment.range(start, end)), 'years');
  });
});