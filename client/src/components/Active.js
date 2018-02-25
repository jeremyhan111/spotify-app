import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import { Link } from 'react-router-dom'
import axios from 'axios';
const spotifyapi = new SpotifyWebApi();

class Active extends Component {
	constructor(props) {
		super(props);
		// this.getNextSong = this.getNextSong.bind(this);
		this.timer = null
		this.state = {
			playback: null,
			topSong: {
				data: {
					name: 'Shuffle mode'
				}
			}
		}
	};

	componentDidMount() {
		const interval = 1000;

		this.timer = setInterval(() => {
			const song = this.getTopSong()
			if (this.props.auth.user) {
				console.log('what');
				spotifyapi.setAccessToken(this.props.auth.user.accessToken);
				spotifyapi.getMyCurrentPlaybackState().then((playback) => {
					if (playback && playback.progress_ms < 5*interval) {
						console.log('delete this song');

						axios({
							method: 'delete',
							url: `/api/song/${this.props.auth.user.spotifyId}/${playback.item.name}/${playback.item.artists[0].name}`
						}).then((song) => {
							console.log('DELETED');
							console.log(song);
						})
					}

					if (playback && (playback.item.duration_ms - playback.progress_ms) < 3*interval) {
						console.log('send api request to play top song');
						axios({
							method: 'get',
							url: '/api/songs/top',
						}).then((song) => {
							console.log('top song', song);
							spotifyapi.play({uris: [song.data.uri]}).then((success) => {
								console.log(success);
							}, (e) => {
								console.log(e);
							})
						});
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

	// getNextSong() {
	// 	if (this.props.auth.user) {
	// 		this.s.setAccessToken(this.props.auth.user.accessToken);
	// 		this.s.play(null, ['spotify:track:5J8m6w5VmswbMBYUAFf44t']).then((success) => {
	// 			console.log(success);
	// 		}, (e) => {
	// 			console.log(e);
	// 		})
	// 	}
	// }

	getTopSong() {
		axios({
			method: 'get',
			url: '/api/songs/top',
		}).then((song) => {
			this.setState(() => {
				let topSong;

				if (song.data) {
					topSong = song
				} else {
					topSong = {
						data: {
							name: 'Shuffle mode'
						}
					}
				}
				return {
					topSong
				}
			})
		})

	}

	componentWillUnmount() {
		if (this.timer) {
			clearInterval(this.timer);
		}
	}

	render() {
		return (
			<div className="container active">
				<h1 className="active__header">Party</h1>
				<div className="active__current">
					<h3 className="current__header">Now playing</h3>
					{this.state.playback ? <p>Name: {this.state.playback.item.name}</p> : <p>Spotify is off</p>}
					{this.state.playback ? <p>Artist: {this.state.playback.item.artists[0].name}</p> : null}
				</div>

				<div className="active__next">
					<h4 className="next__header">Next song</h4>
					{this.state.topSong.data.name !== 'Shuffle mode' ? <p>Name: {this.state.topSong.data.name}</p> : <p>{this.state.topSong.data.name}</p>}
					{this.state.topSong.data.name !== 'Shuffle mode' ? <p>Artist: {this.state.topSong.data.artist}</p> : null}
				</div>
				<h3>Vote here!</h3>
				{this.props.auth.user && <p>{`localhost:3000/user/${this.props.auth.user.spotifyId}`}</p>}

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