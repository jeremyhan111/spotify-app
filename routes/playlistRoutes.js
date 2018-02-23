const {Playlist} = require('../models/Playlist')
const bodyParser = require('body-parser');


module.exports = (app) => {
	app.use(bodyParser.json());

	app.post('/api/playlists', (req, res) => {
		var playlist = new Playlist({
			playlistId: req.body.id,
			uri: req.body.uri
		});

		playlist.save().then((playlist) => {
			res.send(playlist);
		}, (e) => {
			res.status(400).send(e);
		})
	})

	app.get('/api/playlists', (req, res) => {
		Playlist.find({}).then((playlists) => {
			res.send({playlists});
		}, (e) => {
			res.status(400).send(e);
		})
	})
}