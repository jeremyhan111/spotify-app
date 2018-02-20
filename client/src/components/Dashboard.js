import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';

import Playlists from './Playlists';
import { placePlaylists } from '../actions';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.getPlaylists = this.getPlaylists.bind(this);
		this.handleOnClick = this.handleOnClick.bind(this);
		this.state = {
			playlists: []
		}
	}

	getPlaylists() {
		if (this.props.auth) {
			const s = new SpotifyWebApi();
			s.setAccessToken(this.props.auth.accessToken);
			s.getUserPlaylists(this.props.auth.spotifyId).then((playlists) => {
				this.setState(() => {
					return {
						playlists: playlists.items
					};
				});
			}, (e) => {
				console.log(e);
			})
		}
	}

	handleOnClick() {
		console.log(this.props);
		this.props.dispatch(placePlaylists(this.state.playlists));
	}

	render() {
		return (
			<div>
				<h1>Dashboard</h1>
				<button onClick={this.getPlaylists}>Get Playlists</button>
				<Playlists playlists={this.state.playlists}/>
				<button onClick={this.handleOnClick}><a href='/active'>Let's start!</a></button>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		playlists: state.playlists
	}
}

export default connect(mapStateToProps)(Dashboard);