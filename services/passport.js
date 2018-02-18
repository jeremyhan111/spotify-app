const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const keys = require('../config/keys');
const {User} = require('../models/User')

const clientID = keys.spotifyClientID;
const clientSecret = keys.spotifyClientSecret;
const callbackURL = '/auth/spotify/callback';

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new SpotifyStrategy({
		clientID,
		clientSecret,
		callbackURL
	}, async (accessToken, refreshToken, profile, done) => {
		const user = await User.findOne({ spotifyId: profile.id });
		if (user) {
			return done(null, user);
		}
		const newUser = await new User({spotifyId: profile.id}).save();
		done(null, user);
		
	})
);