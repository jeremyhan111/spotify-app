import React, { Component } from 'react';
import {connect} from 'react-redux';
import {logOut} from '../actions'
import axios from 'axios';

class Header extends Component {
	renderContent() {
		switch(this.props.auth.user) {
			case null:
				return;
			case "":
				return <a href="/auth/spotify">Login with Spotify</a>;
			default:
				return <button onClick={()=> {
					axios({
						method: 'delete',
						url: `/api/logout/${this.props.auth.user.spotifyId}`
					})
				}}><a href={'/api/logout'}>Logout</a></button>;
		}
	}

	render() {
		return (
			<div className="container header">
				<div className="header__logo">
					Spotify Vote
				</div>
				<div className="header__nav">
					{this.renderContent()}
				</div>				
			</div>
		);
	}
};

const mapStateToProps = ({auth}) => {
	return { auth };
};

export default connect(mapStateToProps)(Header);