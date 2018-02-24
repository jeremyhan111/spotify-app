import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import { Link } from 'react-router-dom'
import axios from 'axios';
const spotifyapi = new SpotifyWebApi();

class Active extends Component {
	constructor(props) {
		super(props);
		this.getNextSong = this.getNextSong.bind(this);
		this.getTopSong = this.getTopSong.bind(this);
		this.timer = null
		this.state = {
			playback: null,
			topSong: 'Shuffle mode'
		}
	};

	componentDidMount() {
		const interval = 1000;

		this.timer = setInterval(() => {
			this.getTopSong()
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

					if (playback && (playback.item.duration_ms - playback.progress_ms) < interval+100) {
						console.log('send api request to play top song');
						// const topSong = this.getTopSong();
						// // spotifyapi.play(null, topSong).then((success) => {
						// // 	console.log(success);
						// // }, (e) => {
						// // 	console.log(e);
						// // })

						
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
		axios({
			method: 'get',
			url: '/api/songs/top',
		}).then((song) => {
			this.setState(() => {
				return {
					topSong: song.data.name
				};
			})
		})

	}

	componentWillUnmount() {
		console.log('componentWillUnmount');
		if (this.timer) {
			clearInterval(this.timer);
		}
	}

	render() {
		return (
			<div>
				<h1>Active Page</h1>
				<button onClick={()=>{console.log(this.props)}}>Check Props</button>
				<h3>Now playing</h3>
				{this.state.playback ? <p>{this.state.playback.item.name}</p> : <p>Spotify is off</p>}
				<h4>Next song</h4>
				<p>{this.state.topSong}</p>
				<h3>Share this link with your friends so they can vote!</h3>
				{this.props.auth.user && <p>{`whispering-oasis-52041.herokuapp.com/user/${this.props.auth.user.spotifyId}`}</p>}

				

				<Link to="/guest">Get All Songs</Link>

			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		topSongs: state.topSongs,
		playlists: state.playlists
	}
}

export default connect(mapStateToProps)(Active);