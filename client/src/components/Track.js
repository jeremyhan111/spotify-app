import React, { Component } from 'react';
import axios from 'axios';



class Track extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false
		}
	}

	render () {
		return (
			<button className="track__button" disabled={this.state.disabled} onClick={(e) => {
				//console.log(`/api/songs/${props.userId}/${props.track.name}/${props.track.artist}`);
				
				this.setState(() => {
					return {
						disabled: true
					}
				})
				axios({
					method: 'patch',
					url: `/api/songs/${this.props.userId}/${this.props.track.name}/${this.props.track.artist}`
				})

			}}>
				{this.props.track.name}
			</button>
		);
	};
}

export default Track;
