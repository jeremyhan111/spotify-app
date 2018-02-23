var mongoose = require('mongoose');

const Playlist = mongoose.model('Playlist', {
	playlistId: {
		type: String,
		required: true
	},
	uri: {
		type: String,
		required: true
	}
});

module.exports = {Playlist};