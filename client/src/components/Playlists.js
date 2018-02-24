import React from 'react';
import Playlist from './Playlist';

const Playlists = (props) => {
	console.log(props);
	return (
		<div>
			<h1>Your Playlists</h1>
			<ol>
				{props.playlists.map((playlist) => <Playlist 
										   playlist={playlist}
										   key={playlist.uri}
										   /> )}
			</ol>
		</div>
	)
}

export default Playlists;