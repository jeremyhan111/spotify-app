const {Topsong} = require('../models/Topsong')
const bodyParser = require('body-parser');


module.exports = (app) => {

	app.post('/api/topsongs', (req, res) => {
		var topsong = new Topsong({
			name: req.body.name,
			songId: req.body.id,
			uri: req.body.uri,
			count: 1
		});

		topsong.save().then((topsong) => {
			res.send(topsong);
		}, (e) => {
			res.status(400).send(e);
		})
	})

	app.get('/api/topsongs', (req, res) => {
		Topsong.find({}).then((topsongs) => {
			res.send({topsongs});
		}, (e) => {
			res.status(400).send(e);
		})
	})

	app.patch('/api/topsongs/:id', (req, res) => {
		//grab by song id
		var id = req.params.id;
		Topsong.findOne({
			songId: id
		}).then((song) => {
			song.update({$inc: {count:1}}, (e)=>{console.log(e)})
			res.send(song);
		}).catch((e) => {
			res.status(400).send();
		})
	})

	app.delete('/api/topsongs/:id', (req, res) => {
		var id = req.params.id;
		Topsong.findOneAndRemove({
			songId: id
		}).then((song) => {
			res.send(song);
		}).catch((e) => {
			res.status(400).send();
		})

	})

}