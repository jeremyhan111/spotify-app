import React from 'react';
import Tracks from './Tracks';

const Playlist = (props) => {
	return (
		<div>
			<button>{props.playlist.name}</button>
			<Tracks playlist={props.playlist} />
		</div>
	);
}

export default Playlist;