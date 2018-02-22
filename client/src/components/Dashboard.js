import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import { Link } from 'react-router-dom'

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

	async getPlaylists() {
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
		this.props.dispatch(placePlaylists(this.state.playlists));
	}

	render() {
		this.getPlaylists();
		return (
			<div>
				<h1>Dashboard</h1>
				
				<Playlists playlists={this.state.playlists}/>
				<button onClick={this.handleOnClick}><Link to={'/active'}>Let's start</Link></button>
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