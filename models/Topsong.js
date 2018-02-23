var mongoose = require('mongoose');

const Topsong = mongoose.model('Topsong', {
	name: {
		type: String,
		required: true
	},
	songId: {
		type: String,
		required: true
	},
	uri: {
		type: String,
		required: true
	}, 
	count: {
		type: Number,
		required: true
	}
});

module.exports = {Topsong};