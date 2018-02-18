const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
const keys = require('./config/keys');

require('./services/passport');

const app = express();

app.use(
	cookieSession({
		maxAge: 30*24*60*60*1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
	res.send({name: 'Jeremy'});
})

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);