const passport = require('passport');
const {Song} = require('../models/Song')

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

	app.delete('/api/logout/:id', (req, res) => {
		var id = req.params.id;
		Song.remove({ userId: id }).then((songs) => {
			res.send(songs)
		}).catch((e) => {
			res.status(400).send(e);
		})
	});

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		console.log(req);
		res.send(req.user);
	})
};