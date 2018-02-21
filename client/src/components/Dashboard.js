import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';

import Playlists from './Playlists';
import { placePlaylists } from '../actions';

const spotifyapi = new SpotifyWebApi();

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.handleOnClick = this.handleOnClick.bind(this);
		this.state = {
			playlists: []
		};
	}

	async doStuff() {
		if (this.props.auth.user) {
			spotifyapi.setAccessToken(this.props.auth.user.accessToken);
			const playlists = await spotifyapi.getUserPlaylists(this.props.auth.user.spotifyId);
			this.setState(() => {
				return {
					playlists: playlists.items
				}
			})
		}
	}

	handleOnClick(e) {
		console.log('current playlists: ', this.state.playlists);
		this.props.dispatch(placePlaylists(this.state.playlists));
	}

	render() {
		this.doStuff();
		return (
			<div>
				<h1>Dashboard</h1>
				<Playlists playlists={this.state.playlists}/>
				<button onClick={this.handleOnClick}><a href='/active'>Let's start!</a></button>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps)(Dashboard);