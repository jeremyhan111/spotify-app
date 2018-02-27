const {Song} = require('../models/Song')
const bodyParser = require('body-parser');


module.exports = (app) => {
	app.post('/api/songs', (req, res) => {
		var song = new Song({
			name: req.body.name,
			artist: req.body.artist,
			uri: req.body.uri,
			userId: req.body.userId,
			playlistId: req.body.playlistId,
			count: 0
		});

		song.save().then((song) => {
			res.send(song);
		}, (e) => {
			res.status(400).send(e);
		})
	})

	app.delete('/api/songs', (req, res) => {
		Song.remove({
			playlistId: req.body.playlistId
		}).then((songs) => {
			res.send({songs});
		}).catch((e) => {
			res.status(400).send();
		})
	})


	app.get('/api/songs', (req, res) => {
		Song.find({}).then((songs) => {
			res.send({songs});
		}, (e) => {
			res.status(400).send(e);
		})
	})

	app.get('/api/songs/top/:id', (req, res) => {
		var id = req.params.id;
		Song.find({
			userId: id,
			count: { $gt: 0 }
		})
		.sort({ count: -1})
		.then((songs) => {
			res.send(songs[0]);
		}, (e) => {
			res.status(400).send(e);
		})
	})

	app.patch('/api/songs/:spotifyId/:songName/:artist', (req, res) => {
		var id = req.params.spotifyId;
		var songName = req.params.songName;
		var artist = req.params.artist;

		Song.findOne({
			name: songName,
			artist: artist,
			userId: id
		}).then((song) => {
			song.update({$inc: {count:1}}, (e)=>{console.log(e)})
			res.send(song);
		}).catch((e) => {
			res.status(400).send();
		})
	})

	app.get('/api/songs/:spotifyId', (req, res) => {
		var spotifyId = req.params.spotifyId;
		Song.find({
			userId: spotifyId
		}).then((songs) => {
			res.send(songs);
		}).catch((e) => {
			res.status(400).send();
		})
	})

	

	app.delete('/api/song/:spotifyId/:songName/:artist', (req, res) => {
		var id = req.params.spotifyId;
		var songName = req.params.songName;
		var artist = req.params.artist;

		Song.findOneAndRemove({
			name: songName,
			artist: artist,
			userId: id
		}).then((song) => {
			res.send(song);
		}).catch((e) => {
			res.status(400).send();
		})

	})

	app.delete('/api/songs/:spotifyId', (req, res) => {
		var id = req.params.spotifyId;
		Song.remove({
			userId: id
		}).then((songs) => {
			res.send({songs});
		}).catch((e) => {
			res.status(400).send();
		})
	})
}