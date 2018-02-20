import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';


class Active extends Component {


	constructor(props) {
		super(props);
		this.getPlayBack = this.getPlayBack.bind(this);
		this.getNextSong = this.getNextSong.bind(this);
		this.s = new SpotifyWebApi();

	}

	getNextSong() {
		if (this.props.auth) {
			this.s.setAccessToken(this.props.auth.accessToken);
			console.log('hello');
			this.s.play(null, ['spotify:track:5J8m6w5VmswbMBYUAFf44t']).then((success) => {
				console.log(success);
			}, (e) => {
				console.log(e);
			})
		}
	}

	getPlayBack() {
		console.log("hello");
		console.log(this.props.auth);
		if (this.props.auth) {
			console.log("working");
			
			this.s.setAccessToken(this.props.auth.accessToken);
			this.s.getMyCurrentPlaybackState().then((playback) => {
				console.log(playback);
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

export default connect(mapStateToProps)(Active);