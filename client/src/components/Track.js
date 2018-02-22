import React from 'react';

const Track = (props) => {
	return (
		<li><button onClick={(e) => {
			props.onClick(props.track.track)
		}}>
			{props.track.track.name}
		</button></li>
	);
}

export default Track