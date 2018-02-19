import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import {connect} from 'react-redux';

class Tracks extends Component {
	constructor(props) {
		super(props);
		this.getTracks = this.getTracks.bind(this)
		this.tracks = null
	}


	getTracks() {
		if (this.props.auth) {
			const s = new SpotifyWebApi();
			s.setAccessToken(this.props.auth.accessToken);
			s.getPlaylistTracks(this.props.playlist.owner.id, this.props.playlist.id).then((tracks) => {
				this.tracks = tracks;
			}, (e) => {
				console.log(e);
			})
		}

	}

	render() {
		return (
			<div>
				<button onClick={this.getTracks}>Get tracks</button>
				<h1>Tracks</h1>
				<ol>
					{!this.tracks}
				</ol>

			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps)(Tracks);