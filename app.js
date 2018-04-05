const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');

const {ObjectID} = require('mongodb');
const keys = require('./config/keys');

require('./services/passport');
const {mongoose} = require('./db/mongoose');

const app = express();

app.use(
	cookieSession({
		maxAge: 30*24*60*60*1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/playlistRoutes')(app);
require('./routes/songRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);