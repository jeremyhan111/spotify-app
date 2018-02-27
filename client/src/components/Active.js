import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import { Link } from 'react-router-dom';

import axios from 'axios';
import QRCode from 'qrcode.react';

const spotifyapi = new SpotifyWebApi();

class Active extends Component {
	constructor(props) {
		super(props);
		this.changeColors = this.changeColors.bind(this);
		this.timer = null;
		this.colorTimer = null;
		this.state = {
			error: "",
			lights: false,
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
		this.colors = ['blue', 'teal', 'green', 'red', 'yellow', 'orange', 'purple'];
	};


	changeColors() {
		var letters = document.getElementsByClassName("header__letter");
		for (var i = 0; i < letters.length; i++) {
			const randomNum = Math.floor(Math.random()*this.colors.length);
			const color = this.colors[randomNum];

			if (letters[i].classList.length > 1) {
				letters[i].classList.remove(letters[i].classList[1]);
			}

			letters[i].classList.add(color);
		}


	}

	clearLights() {
		var letters = document.getElementsByClassName("header__letter");
		for (var i = 0; i < letters.length; i++) {
			if (letters[i].classList.length > 1) {
				letters[i].classList.remove(letters[i].classList[1]);
			}
		}
	}

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
								console.log("ahhhhasdfs")

								if (this.props.playlists.length === 0) {
									console.log('this is a bug i need to fix. it occurs because someone refreshes the page or for some reaosn has zero playlists picked');
									return;
								}

								const randomNum = Math.floor(Math.random()*this.props.playlists.length);
								const playlist = this.props.playlists[randomNum];
								this.shuffleMode = true;
								context = {context_uri: playlist.uri}		//play random playlist
							} else {

								console.log('ahhh');
								if (this.firstSong) {
									if (this.props.playlists.length === 0) {
										return;
									}

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
		if (this.props.auth.user) {
			console.log(`/api/songs/top/${this.props.auth.user.spotifyId}`);
			axios({
				method: 'get',
				url: `/api/songs/top/${this.props.auth.user.spotifyId}`,
			}).then((song) => {
				console.log(song);
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

	}

	componentWillUnmount() {
		if (this.timer) {
			clearInterval(this.timer);
		}

		if (this.colorTimer) {
			clearInterval(this.colorTimer);
		}
	}

	render() {
		return (
			<div className="container active">
				<div className="active__header">
					<h3 className="header__letter">P</h3>
					<h3 className="header__letter">A</h3>
					<h3 className="header__letter">R</h3>
					<h3 className="header__letter">T</h3>
					<h3 className="header__letter">Y</h3>
				</div>

				<div className="light-switch">
					<input onClick={() => {
						if (!this.state.lights) {
							this.colorTimer = setInterval(this.changeColors, 150);
						} else {
							this.clearLights();
							clearInterval(this.colorTimer);
						}

						this.setState((prevState) => {
							return {
								lights: !prevState.lights
							}
						})

					}}
					type="checkbox" name="switch" id="switch"/>
					<label className="switch" for="switch"></label>
				</div>

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