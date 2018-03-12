import React from 'react';
import { Link } from 'react-router-dom'

const Landing = () => {
	return (
		<div className="container landing">
			<h1 className="landing__title">Spotify Vote</h1>
			<h3 className="landing__subtitle">Democratic Playlists</h3>
			<a href="/auth/spotify"><button className="landing__button">GET STARTED</button></a>
		</div>
	);
};

export default Landing;