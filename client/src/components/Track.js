import React from 'react';
import { addTopSong } from '../actions';
import { connect } from 'react-redux';

const Track = (props) => {
	return (
		<li><button onClick={(e) => {
			console.log(props);
			props.dispatch(addTopSong(props.track.track));
		}}>
			{props.track.track.name}
		</button></li>
	);
}

export default connect()(Track);