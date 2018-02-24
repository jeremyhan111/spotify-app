var mongoose = require('mongoose');

const Song = mongoose.model('Song', {
	name: {
		type: String,
		required: true
	},
	artist: {
		type: String,
		required: true
	},
	uri: {
		type: String,
		required: true
	}, 
	userId: {
		type: String,
		required: true
	},
	count: {
		type: Number,
		required: true
	}, playlistId: {
		type: String
	}
});

module.exports = {Song};