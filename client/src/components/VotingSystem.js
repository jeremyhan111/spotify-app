import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import Track from './Track';
const spotifyapi = new SpotifyWebApi();

class VotingSystem extends Component {
	constructor(props) {
		super(props);
		// this.onClick = this.onClick.bind(this);

		this.state = {
			songs: [{track: {
				name: 'First'
			}}]
		}
	}

	async getSongs() {
		if (this.props.auth.user) {
			console.log(this.props)
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

	componentDidMount() {
		this.getSongs();
	}

	render() {
		return (
			<div>
				<p>This is the voting system</p>
				<ol>
					{this.state.songs.map((song) => {
						return <Track track={song} />
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