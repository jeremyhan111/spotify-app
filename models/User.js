const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	spotifyId: {
		type: String
	}, 
	accessToken: {
		type: String
	},
	refreshToken: {
		type: String
	}
});

const User = mongoose.model('User', UserSchema);


module.exports = {User};