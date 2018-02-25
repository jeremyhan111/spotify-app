import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import { Link } from 'react-router-dom'
import axios from 'axios';

import Playlists from './Playlists';
import { placePlaylists } from '../actions';

const spotifyapi = new SpotifyWebApi();

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.getPlaylists = this.getPlaylists.bind(this);
		this.state = {
			playlists: []
		};
	}

	componentDidMount() {
		setTimeout(this.getPlaylists, 100);
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

	render() {
		return (
			<div className="container">
				<h1>Pick your playlists</h1>
				<h4>Your guests will be able to vote for their favorite songs from the playlists you pick</h4>
				
				<Playlists playlists={this.state.playlists}/>
				<button><Link to={'/active'}>Let's start</Link></button>
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