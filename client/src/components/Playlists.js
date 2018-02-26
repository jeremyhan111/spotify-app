import React from 'react';
import Playlist from './Playlist';

const Playlists = (props) => {
	console.log(props);
	return (
		<div className="container playlists">
			<ol className="playlists__list">
				{props.playlists.map((playlist) => <Playlist 
										   playlist={playlist}
										   key={playlist.uri}
										   /> )}
			</ol>
		</div>
	)
}

export default Playlists;