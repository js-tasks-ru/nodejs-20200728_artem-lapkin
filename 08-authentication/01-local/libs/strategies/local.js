const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

module.exports = new LocalStrategy(
  {usernameField: 'email', session: false},
  async function(email, password, done) {
    try {
      const user = await User.findOne({email});

      if (!user) {
        done(null, false, 'Нет такого пользователя');
        return;
      } else {
        const isValid = await user.checkPassword(password);
        
        if (!isValid) {
          done(null, false, 'Неверный пароль');
          return;
        } else {
          done(null, user, 'Ok');
          return;
        }
      }
      done(null, false, 'Стратегия подключена, но еще не настроена');
    } catch (err) {
      done(err, false, 'Internal Server Error');
    }
  }
);
