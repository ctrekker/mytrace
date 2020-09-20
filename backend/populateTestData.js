require('dotenv').config();
const mongoose = require('mongoose');
const moment = require('moment');
const User = require('./models/User');
const MetricEntry = require('./models/MetricEntry');
mongoose.connect(process.env.MONGO_URI);


const userCount = 100;
// const pointCount = 365;

async function exec() {
  for(let i=0; i<userCount; i++) {
    const sourceDist = {
      'ELECTRIC': randomNormal(28.9, 10),
      'NATURAL_GAS': randomNormal(0.257, 0.025),
      'TRANSPORTATION': randomNormal(1.79726, 0.5),
    };
    
    let currentDate = moment().subtract(5, 'year');
    const currentUser = await User.create({
      name: i + '',
      email: i + '@example.com',
      password: i
    });
    console.log('Current user: ' + i);
    
    while(currentDate.diff(moment(), 'days') < 0) {
      for(let source of ['ELECTRIC', 'NATURAL_GAS', 'TRANSPORTATION']) {
        const entry = new MetricEntry({
          user: currentUser._id,
          source,
          data: sourceDist[source](),
          metricTimestamp: currentDate.toDate()
        });
        entry.save();
      }
      currentDate.add(1, 'day');
    }
  }
}

function randomNormal(mean, stdev) {
  var y2;
  var use_last = false;
  return function() {
    var y1;
    if(use_last) {
      y1 = y2;
      use_last = false;
    }
    else {
      var x1, x2, w;
      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w  = x1 * x1 + x2 * x2;
      } while( w >= 1.0);
      w = Math.sqrt((-2.0 * Math.log(w))/w);
      y1 = x1 * w;
      y2 = x2 * w;
      use_last = true;
    }
    
    var retval = mean + stdev * y1;
    if(retval > 0)
      return retval;
    return -retval;
  }
}

exec()
  .then(() => console.log('Completed user generation'))
  .catch((err) => console.error(err));
