import React, { Component } from 'react';

export default class VotingSystem extends Component {
	constructor(props) {
		super(props);
		this.getSongs = this.getSongs.bind(this);
	}

	state = {
		topSongs: []
	}


	getSongs() {
		console.log(this.props);
	}


	render() {
		return (
			<div>
				<p>This is the voting system</p>
				<button onClick={this.getSongs}>populate songs</button>

			</div>
		)
	}
}