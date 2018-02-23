module.exports = {
	spotifyClientID: 'f7d2545a5c5e4831a37fa2ac24a9ced6',
	spotifyClientSecret: 'bcd1eac8efce448189e05c148774cb3b',
	cookieKey: 'lklksjiuiutgllwkejrlkmncvballjkhlksjk4jr4uoii',
	dbuser: 'spotifyappprod',
	dbpw: 'spotifyappprod'
};

module.exports = {
	spotifyClientID: process.env.SPOTIFY_CLIENT_ID,
	spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
	cookieKey: process.env.COOKIE_KEY,
	dbuser: process.env.DB_USER,
	dbpw: process.env.DB_PW
};