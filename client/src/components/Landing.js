import React from 'react';
import { Link } from 'react-router-dom'

const Landing = () => {
	return (
		<div>
			<h1>Spotify Vote</h1>
			<h3>Democratic Playlists</h3>
			<Link to="/dashboard"><button>Get started</button></Link>
		</div>
	);
};

export default Landing;