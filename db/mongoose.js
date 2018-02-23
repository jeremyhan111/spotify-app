const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.Promise = global.Promise;
const local = "mongodb://localhost:27017/SpotifyApp";
const online = `mongodb://${keys.dbuser}:${keys.dbpw}@ds163745.mlab.com:63745/spotify-app-prod`

mongoose.connect(online);

module.exports = { mongoose };