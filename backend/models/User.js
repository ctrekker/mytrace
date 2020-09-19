const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const Bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = Bcrypt.hashSync(this.password, 10);
  next();
});
UserSchema.methods.comparePassword = function (plaintext) {
  return new Promise((resolve, reject) => {
    resolve(Bcrypt.compareSync(plaintext, this.password));
  });
};
UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

UserSchema.plugin(timestamp);
UserSchema.index({email: 1});

module.exports = mongoose.model('User', UserSchema);
