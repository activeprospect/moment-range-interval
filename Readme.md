# Moment Range Interval

Derive an interval string from a [moment range](https://github.com/rotaready/moment-range).

[![Build Status](https://travis-ci.org/activeprospect/moment-range-interval.svg?branch=master)](https://travis-ci.org/activeprospect/moment-range-interval)

### Installation

```bash
npm install moment-range-interval --save
```

### Usage

This library examines a moment range and determines an appropriate time series interval to use for the range.

```javascript
const moment      = require('moment-range').extendMoment(require('moment')),
      getInterval = require('moment-range-interval');

const interval = getInterval(moment.range('2017-10-24T00:00:00.000', '2017-10-28T23:59:59.999'));

console.log(interval);
// =>
// days
```

### How it works

The interval with the highest possible resolution will be selected for the specified range. The default resolution (60)
will get you 60 "buckets" of data or fewer.

The supported intervals are:

* minutes
* hours
* days
* weeks
* months
* years