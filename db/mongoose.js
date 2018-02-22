const mongoose = require('mongoose');
//const keys = require('../config/keys');

mongoose.Promise = global.Promise;
const local = "mongodb://localhost:27017/SpotifyApp";
//const online = `mongodb://${keys.dbuser}:${keys.dbpw}@ds143738.mlab.com:43738/spotify-app`
mongoose.connect(local);

module.exports = { mongoose };