const jwt = require('jsonwebtoken');
const User = require('./models/User');

function error(res) {
  res.status(403).send('Not authenticated');
}

function requireAuth(req, res, next) {
  jwt.verify(req.cookies['token'], process.env.JWT_SECRET, async (err, payload) => {
    if(err) {
      error(res);
      return;
    }

    const user = await User.findById(payload._id);
    if(!user) {
      error(res);
      return;
    }
    
    req.user = user;
    
    next();
  });
}

module.exports = {
  requireAuth
};