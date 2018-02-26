import React from 'react';
import {connect} from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios';

import replace from '../images/no-album.jpg'
import { addPlaylist, removePlaylist } from '../actions';
const spotifyapi = new SpotifyWebApi();

const Playlist = (props) => {
	console.log(props);
	return (
		<div className="playlist__img-container" >
			{<img className="playlist__album-img"
				src={props.playlist.images[1] ? props.playlist.images[1].url : replace}
				
				onHover={() => {
					console.log(props.playlist.name);
				}}

				onClick={()=>{
				 	for (var i = 0; i < props.playlists.length; i++) {
				 		if (props.playlists[i].uri === props.playlist.uri) {
				 			console.log('ALREADY IN HERE THO');
				 			props.dispatch(removePlaylist(props.playlist));
				 			axios({
								method: 'delete',
								url: '/api/songs',
								data: {
									playlistId: props.playlist.id
								}
							}).catch((e) => {
								console.log(e);
							})

				 			return;
				 		}
				 	}
				 	props.dispatch(addPlaylist(props.playlist));
				 	spotifyapi.getPlaylistTracks(props.playlist.owner.id, props.playlist.id).then((tracks) => {
						tracks.items.forEach((track) => {
							if (track.track.uri.indexOf('local') > -1) {
								console.log('is local');
								return;
							}

							axios({
								method: 'post',
								url: '/api/songs',
								data: {
									name: track.track.name,
									artist: track.track.artists[0].name,
									uri: track.track.uri,
									userId: props.auth.user.spotifyId,
									playlistId: props.playlist.id
								}
							}).catch((e) => {
								console.log(e);
							})
						})
					})



				 }}/>}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		playlists: state.playlists
	}
}

export default connect(mapStateToProps)(Playlist);