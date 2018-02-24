import React from 'react';

const Playlist = (props) => {
	return (
		<div>
			<button>{props.playlist.name}</button>
			<iframe src={`https://open.spotify.com/embed?uri=${props.playlist.uri}&theme=white`} width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
			<button>Use this playlist</button>
		</div>
	);
}

export default Playlist;