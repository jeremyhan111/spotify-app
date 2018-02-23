const passport = require('passport');

module.exports = (app) => {
	app.get('/auth/spotify', 
		passport.authenticate('spotify', {
			scope: ['playlist-read-collaborative', 'playlist-read-private', 
			'user-read-playback-state', 'user-modify-playback-state',
			'user-read-currently-playing', 'streaming']
		}),
		(req, res) => {
		}
	)

	app.get('/auth/spotify/callback', 
		passport.authenticate('spotify'),
		(req, res) => {
			res.redirect('/dashboard');
	});

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	})
};