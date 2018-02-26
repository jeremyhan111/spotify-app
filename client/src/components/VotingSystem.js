import React, { Component } from 'react';
import Tracks from './Tracks';

import Track from './Track';
import axios from 'axios';

class VotingSystem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			artists: []
		}
	}

	// this.state = {
	// 	artists: []
	// 	each item in pairs is a pair of artist and songs:
	// 	{
	// 		name: 'Nujabes',
	// 		songs: [song1, song2, song3]
	// 	}
	// }

	async getSongs() {
		axios.get(`/api/songs/${this.props.id}`).then((songs) => {
			let artists = []

			songs.data.map((song) => {
				let found = false;

				artists.map((artist) => {
					if (artist.name === song.artist) {
						artist.songs.push(song)
						found = true;
					}
				})

				if (!found) {
					artists.push({
						name: song.artist,
						songs: [song]
					});
				}
			})

			artists.sort((a, b) => {
				if (a.name.toLowerCase() < b.name.toLowerCase()) {
					return -1;
				}
				if (a.name.toLowerCase() > b.name.toLowerCase()) {
					return 1;
				}
				return 0;
			});

			this.setState(() => {
				return {
					artists
				}
			})
		})
	}


	componentDidMount() {
		this.getSongs();
	}

	render() {
		return (
			<div className="container">
				<h2>Vote for your favorite songs</h2>
				<ol>
					{this.state.artists && this.state.artists.map((artist) => {	
						return (
							<div>
								<h3>{artist.name}</h3>
								<Tracks userId={this.props.id} tracks={artist.songs} />
							</div>
						)

					})}

					{this.state.songs && this.state.songs.map((song) => {
						return <Track userId={this.props.id} track={song} />
					})}
				</ol>


			</div>
		)
	}
}


export default VotingSystem;