import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import VotingSystem from './VotingSystem';
import { removeTopSong } from '../actions'
const spotifyapi = new SpotifyWebApi();

class Active extends Component {
	constructor(props) {
		super(props);
		this.getNextSong = this.getNextSong.bind(this);
		this.getTopSong = this.getTopSong.bind(this);
		this.state = {
			playback: null
		}
	};

	componentDidMount() {
		const interval = 1000;

		setInterval(() => {
			if (this.props.auth.user) {
				console.log('what');
				spotifyapi.setAccessToken(this.props.auth.user.accessToken);
				spotifyapi.getMyCurrentPlaybackState().then((playback) => {
					if ((playback.item.duration_ms - playback.progress_ms) < interval+100) {
						console.log('send api request to play top song');
						const topSong = this.getTopSong();
						// spotifyapi.play(null, topSong).then((success) => {
						// 	console.log(success);
						// }, (e) => {
						// 	console.log(e);
						// })

						this.props.dispatch(removeTopSong(topSong));
					}

					this.setState(() => {
						return {
							playback
						}
					})
				})
			}
		}, interval);
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

	getTopSong() {
		const topSongs = this.props.topSongs.topSongs;
		let max = -1;
		let topSong = 'Shuffle mode';


		for (var key in topSongs) {
			if (topSongs.hasOwnProperty(key)) {
				if (topSongs[key] > max) {
					max = topSongs[key];
					topSong = key
				}
			}
		}

		return topSong;
	}

	render() {

		return (
			<div>
				<h1>Active Page</h1>
				<button onClick={()=>{console.log(this.props.topSongs.topSongs)}}>Check Props</button>
				<h3>Now playing</h3>
				{this.state.playback ? <p>{this.state.playback.item.name}</p> : <p>Spotify is off</p>}
				<h4>Next song</h4>
				{<p>{this.getTopSong()}</p>}
				<h3>Share this link with your friends so they can vote!</h3>

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		topSongs: state.topSongs
	}
}

export default connect(mapStateToProps)(Active);