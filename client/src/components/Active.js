import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import { Link } from 'react-router-dom'
import axios from 'axios';
import QRCode from 'qrcode.react';

const spotifyapi = new SpotifyWebApi();

class Active extends Component {
	constructor(props) {
		super(props);
		this.timer = null
		this.state = {
			playback: null,
			topSong: {
				data: {
					name: 'Shuffle mode'
				}
			}
		}
		this.firstSong = true;
		this.endOfSong = true;
		this.shuffleMode = true;
	};

	componentDidMount() {
		const interval = 1000;

		this.timer = setInterval(() => {
			this.getTopSong()
			console.log(this.state);
			if (this.props.auth.user) {
				spotifyapi.setAccessToken(this.props.auth.user.accessToken);
				spotifyapi.getMyCurrentPlaybackState().then((playback) => {

					if (playback && playback.progress_ms < 5*interval && !this.endOfSong) {
						this.endOfSong = true;
						console.log('beginning');
						axios({
							method: 'delete',
							url: `/api/song/${this.props.auth.user.spotifyId}/${playback.item.name}/${playback.item.artists[0].name}`
						}).then((song) => {
							console.log(song);
						})
					}

					if (playback && (playback.item.duration_ms - playback.progress_ms) < 3*interval && this.endOfSong) {
						this.endOfSong = false;
						console.log('end');

						const song = this.state.topSong;

						let context;

						console.log(song.data);

						if (song.data.name === "Shuffle mode") { //if no top song
							if (!this.shuffleMode) {
								const randomNum = Math.floor(Math.random()*this.props.playlists.length);
								console.log(randomNum);
								const playlist = this.props.playlists[randomNum];
								console.log(this.props.playlists);
								this.shuffleMode = true;
								context = {context_uri: playlist.uri}		//play random playlist
							} else {
								if (this.firstSong) {
									const randomNum = Math.floor(Math.random()*this.props.playlists.length);
									console.log(randomNum);
									const playlist = this.props.playlists[randomNum];
									console.log(this.props.playlists);
									this.firstSong = false;
									context = {context_uri: playlist.uri}
								} else {
									return;
								}
							}
						} else { //else play top song
							this.shuffleMode = false;
							context = {uris: [song.data.uri]};
						}

						console.log(context);

						spotifyapi.play(context);
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
				{this.props.auth.user && <p>{`spotifyvote.herokuapp.com/user/${this.props.auth.user.spotifyId}`}</p>}
				{this.props.auth.user && <QRCode 
				fgColor={"#00BFFF"}
				value={`http://spotifyvote.herokuapp.com/user/${this.props.auth.user.spotifyId}`}/>}

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