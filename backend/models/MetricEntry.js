const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const MetricEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Should be: ELECTRIC|NATURAL_GAS|TRANSPORTATION
  source: {
    type: String,
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  carbonImpact: {
    type: Number,
    required: false
  },
  metricTimestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
});

// MetricEntrySchema.pre('save', function(next) {
//   if(!this.isModified('password')) {
//     return next();
//   }
//   this.password = Bcrypt.hashSync(this.password, 10);
//   next();
// });

MetricEntrySchema.index({ user: 1, source: 1, metricTimestamp: 1 });
MetricEntrySchema.plugin(timestamp);

module.exports = mongoose.model('MetricEntry', MetricEntrySchema);
