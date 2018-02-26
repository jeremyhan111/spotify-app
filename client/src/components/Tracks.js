import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import {connect} from 'react-redux';

import Track from './Track';

const Tracks = (props) => {
	return (
		<div>
			<ol>
				{props.tracks.map((track) => {
					return <Track userId={props.userId} track={track}/>
				})}
			</ol>
		</div>
	)	
}

export default Tracks