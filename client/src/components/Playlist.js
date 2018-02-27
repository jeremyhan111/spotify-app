import React, { Component } from 'react';
import {connect} from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import axios from 'axios';

import replace from '../images/no-album.jpg'
import { addPlaylist, removePlaylist } from '../actions';
const spotifyapi = new SpotifyWebApi();

class Playlist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: true
		}

	}

	deletePlaylist() {
		for (var i = 0; i < this.props.playlists.length; i++) {
			if (this.props.playlists[i].uri === this.props.playlist.uri) {
				this.props.dispatch(removePlaylist(this.props.playlist));

				axios({
					method: 'delete',
					url: '/api/songs',
					data: {
						playlistId: this.props.playlist.id
					}
				}).catch((e) => {
					console.log(e);
				})

		 		return true;
	 		}
	 	}

	 	return false

	}

	addPlaylist () {
		this.props.dispatch(addPlaylist(this.props.playlist));
		spotifyapi.getPlaylistTracks(this.props.playlist.owner.id, this.props.playlist.id).then((tracks) => {
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
						userId: this.props.auth.user.spotifyId,
						playlistId: this.props.playlist.id
					}
				}).catch((e) => {
					console.log(e);
				})
			})
		})
	}



	render() {
		return (
			<div className="playlist__img-container" >
			
			
				<img className="playlist__album-img"
					visited={this.state.disabled}
					src={this.props.playlist.images[1] ? this.props.playlist.images[1].url : replace}
					onClick={() => { //deletes playlist
						console.log(this.state.disabled);
						console.log(this.props);
						if (!this.deletePlaylist()) {
							this.addPlaylist()
						}
						this.setState(() => {
							return {
								disabled: true
							}
						})

					 }}/>
					<div className="overlay">
					 	<p className="album-img__description">{this.props.playlist.name}</p>
					</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		playlists: state.playlists
	}
}

export default connect(mapStateToProps)(Playlist);