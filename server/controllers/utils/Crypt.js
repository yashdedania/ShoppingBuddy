var bcrypt = require('bcrypt');

exports.cryptPassword = function (password) {
  bcrypt.genSalt(11, function (err, salt) {
    if (err)
      return err;
    else {
      bcrypt.hash(password, salt, function (err, hash) {
        console.log('cryptPass: ', err); console.log('cryptPass: ', hash);
        return err == null ? hash : err;
      });
    }
  });
};

exports.comparePassword = function (plainPass, hashword) {
  bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
    return err == null ? isPasswordMatch : err;
  });
};
