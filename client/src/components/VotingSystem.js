import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyapi = new SpotifyWebApi();

class VotingSystem extends Component {
	constructor(props) {
		super(props);
		this.getSongs = this.getSongs.bind(this);
		this.state = {
			songs: [],
			topSongs: []
		}
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
			console.log('getsongs');
			this.setState(() => {
				return {
					songs
				}
			})
		}
	}


	render() {

		return (
			<div>
				<p>This is the voting system</p>
				<button onClick={this.getSongs}>Populate tracks</button>
				<ol>
					{console.log('thisstate', this.state)}
					{this.state.songs.map((song) => {
						console.log(song);
						return <li>{song.track.name}</li>
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