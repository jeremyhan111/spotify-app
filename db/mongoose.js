const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const local = "mongodb://localhost:27017/SpotifyApp";
mongoose.connect(local);

module.exports = { mongoose };