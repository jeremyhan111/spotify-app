import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import Track from './Track';
const spotifyapi = new SpotifyWebApi();

class VotingSystem extends Component {
	constructor(props) {
		super(props);
		this.getSongs = this.getSongs.bind(this);
		this.onClick = this.onClick.bind(this);
		this.state = {
			songs: [],
			topSongs: {}
		}
	}

	onClick (track) {
		this.setState((prevState) => {
			var newState = {
				topSongs: {
					...prevState.topSongs
				}
			}

			if (track.name in this.state.topSongs) {
				newState.topSongs[track.name] += 1
			} else {
				newState.topSongs[track.name] = 1
			}

			return newState;
		})
	}

	async getSongs() {
		if (this.props.auth.user) {
			spotifyapi.setAccessToken(this.props.auth.user.accessToken);
			var songs = []
			for (var i = 0; i < this.props.playlists.playlists.length; i++) {
				let playlist = this.props.playlists.playlists[i];
				const tracks = await spotifyapi.getPlaylistTracks(playlist.owner.id, playlist.id);
				songs = songs.concat(tracks.items);
			}
			this.setState(() => {
				return {
					songs
				}
			})
		}
	}


	render() {
		console.log('in render', this.state);
		return (
			<div>
				<p>This is the voting system</p>
				<button onClick={this.getSongs}>Populate tracks</button>
				<ol>
					{this.state.songs.map((song) => {
						return <Track track={song}
									  onClick={this.onClick} />
					})}
				</ol>


			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		playlists: state.playlists
	}
}

export default connect(mapStateToProps)(VotingSystem);