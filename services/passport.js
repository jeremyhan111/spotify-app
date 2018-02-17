const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('../config/keys');
const {User} = require('../models/User')

const clientID = keys.spotifyClientID;
const clientSecret = keys.spotifyClientSecret;
const callbackURL = '/auth/spotify/callback';

passport.use(
	new SpotifyStrategy({
		clientID,
		clientSecret,
		callbackURL
	}, (accessToken, refreshToken, profile, done) => {
		const user = new User({
			spotifyId: profile.id
		});

		user.save().then((doc) => {
			res.send(doc);
		}, (e) => {
			res.status(400).send(e);
		})
	})
);