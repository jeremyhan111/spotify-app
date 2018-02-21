import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import VotingSystem from './VotingSystem';



class Active extends Component {
	constructor(props) {
		super(props);
		this.getPlayBack = this.getPlayBack.bind(this);
		this.getNextSong = this.getNextSong.bind(this);
		this.s = new SpotifyWebApi();

	}

	state = {
		playback: {
			item: {
				name: 'sup'
			}
		}
	}

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

	getPlayBack() {
		if (this.props.auth.user) {
			console.log('from playback', this.props.playlists)
			this.s.setAccessToken(this.props.auth.user.accessToken);
			this.s.getMyCurrentPlaybackState().then((playback) => {
				console.log(playback);
				this.setState(() => {
					return {
						playback
					}
				})
			}, (e) => {
				console.log(e);
			})
		}
	}


	render() {
		return (
			<div>
				<h1>Active Page</h1>
				<button onClick={this.getPlayBack}>Get Playback</button>
				<button onClick={this.getNextSong}>Next song</button>
				<p>Now playing</p>
				{this.state.playback && <p>{this.state.playback.item.name}</p>}

				<h3>Share this link with your friends so they can vote!</h3>
				<VotingSystem playlists={this.props.playlists}/>

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log('from mapstatetoprops', state);
	return {
		auth: state.auth,
		playlists: state.playlists
	}
}

export default connect(mapStateToProps)(Active);