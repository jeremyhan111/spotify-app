const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise;

let db;

if (process.env.NODE_ENV === 'production') {
	db = `mongodb://${keys.dbuser}:${keys.dbpw}@ds163745.mlab.com:63745/spotify-app-prod`
} else {
	db = "mongodb://localhost:27017/SpotifyApp";	
}

mongoose.connect(db);

module.exports = { mongoose };