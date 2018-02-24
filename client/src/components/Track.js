import React from 'react';
import axios from 'axios';



const Track = (props) => {
	return (
		<li><button onClick={(e) => {
			console.log(`/api/songs/${props.userId}/${props.track.name}/${props.track.artist}`);
			axios({
				method: 'patch',
				url: `/api/songs/${props.userId}/${props.track.name}/${props.track.artist}`
			})

		}}>
			{props.track.name}
		</button></li>
	);
}

export default Track;
