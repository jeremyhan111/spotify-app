import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import VotingSystem from './VotingSystem';
const spotifyapi = new SpotifyWebApi();


class Active extends Component {
	constructor(props) {
		super(props);
		this.getNextSong = this.getNextSong.bind(this);
		this.state = {
			playback: null
		}
	};


	getNextSong() {
		if (this.props.auth.user) {
			this.s.setAccessToken(this.props.auth.user.accessToken);
			this.s.play(null, ['spotify:track:5J8m6w5VmswbMBYUAFf44t']).then((success) => {
				console.log(success);
			}, (e) => {
				console.log(e);
			})
		}
	}

	async getPlayBack() {
		if (this.props.auth.user) {
			spotifyapi.setAccessToken(this.props.auth.user.accessToken);
			const playback = await spotifyapi.getMyCurrentPlaybackState();
			console.log(playback)
			this.setState(() => {
				return {
					playback
				}
			})
		}
	}


	render() {
		return (
			<div>
				<h1>Active Page</h1>
				<h3>Now playing</h3>
				{this.state.playback ? <p>{this.state.playback.item.name}</p> : <p>Spotify is off</p>}

				<h3>Share this link with your friends so they can vote!</h3>
				<VotingSystem/>

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	}
}

export default connect(mapStateToProps)(Active);