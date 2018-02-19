import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';

import Playlists from './Playlists';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.getPlaylists = this.getPlaylists.bind(this);
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

	render() {
		return (
			<div>
				<h1>Dashboard</h1>
				<button onClick={this.getPlaylists}>Get Playlists</button>
				<Playlists playlists={this.state.playlists}/>
			</div>
		);
	}

		// const q = "owl+city";
		// const type = ['artist'];
		// s.search(q, type).then((res) => {
		// 	console.log(res);
		// })


	
};

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps)(Dashboard);