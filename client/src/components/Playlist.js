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
		this.disabled = false;
	}

	componentDidMount() {
		this.props.playlists.forEach((playlist) => {
			if (playlist.uri === this.props.playlist.uri) {
				var element = document.getElementsByClassName(`album-${this.props.playlist.name}`);
				element[0].classList.add('picked');
				this.disabled = true;
			}
		})
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
			
				<img className={`playlist__album-img album-${this.props.playlist.name}`}
					src={this.props.playlist.images[1] ? this.props.playlist.images[1].url : replace}
					onClick={() => { //deletes playlist
						if (!this.disabled) {
							var element = document.getElementsByClassName(`album-${this.props.playlist.name}`);
							element[0].classList.add('picked');
							this.disabled = true;
							
						} else {
							var element = document.getElementsByClassName(`album-${this.props.playlist.name}`);
							element[0].classList.remove('picked');
							this.disabled = false;
						}
						
						if (!this.deletePlaylist()) {
							this.addPlaylist()
						}

					 }}
				/>
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