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
		callbackURL,
		proxy: true
	}, async (accessToken, refreshToken, profile, done) => {
		const user = await User.findOne({ spotifyId: profile.id });
		if (user) {
			user.accessToken = accessToken;
			user.refreshToken = refreshToken;
			const replace = await user.save();
			return done(null, replace);
		}
		const newUser = await new User({spotifyId: profile.id, accessToken, refreshToken}).save();
		return done(null, newUser);	
	})
);