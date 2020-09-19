require('dotenv').config();
const mongoose = require('mongoose');
const moment = require('moment');
const User = require('./models/User');
const MetricEntry = require('./models/MetricEntry');
mongoose.connect(process.env.MONGO_URI);


async function exec() {
  const users = await User.find({
    email: {
      $regex: /^\d+@example.com$/
    }
  });
  
  for(let user of users) {
    console.log('Deleting ' + user.email);
    await User.deleteOne({ _id: user._id });
    console.log(await MetricEntry.deleteMany({
      user: user._id
    }));
  }
}

exec();