import React, { Component } from 'react';
import { connect } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-js';
import Track from './Track';
import axios from 'axios';


const spotifyapi = new SpotifyWebApi();

class VotingSystem extends Component {
	constructor(props) {
		super(props);
		// this.onClick = this.onClick.bind(this);
		this.state = {
			songs: []
		}
	}

	async getSongs() {
		axios.get(`/api/songs/${this.props.id}`).then((songs) => {
			this.setState(() => {
				return {
					songs: songs.data
				}
			})
		})
	}

	componentDidMount() {
		this.getSongs();
	}

	render() {
		return (
			<div>
				<p>This is the voting system</p>
				<ol>
					{this.state.songs && this.state.songs.map((song) => {
						return <Track userId={this.props.id} track={song} />
					})}
				</ol>


			</div>
		)
	}
}


export default VotingSystem;