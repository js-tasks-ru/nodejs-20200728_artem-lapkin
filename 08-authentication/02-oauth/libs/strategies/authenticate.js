const User = require('../../models/User');

module.exports = async function authenticate(strategy, email, displayName, done) {
  if (!email) return done(null, false, `Не указан email`);

  try {
    const user = await User.findOne({email});  
    if (user) {
      return done(null, user);
    } else {
      let createdUser = await User.create({email: email, displayName: displayName});
      return done(null, createdUser);
    }
  } catch (err) {
    return done(err);
  }

  return done(null, false, `функция аутентификации с помощью ${strategy} не настроена`);
};
