import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'

import {logOut} from '../actions'
import axios from 'axios';

class Header extends Component {
	renderContent() {
		switch(this.props.auth.user) {
			case null:
				return;
			case "":
				return <a href="/auth/spotify">Login</a>;
			default:
				return <a href={'/api/logout'}
					onClick={()=> {
					axios({
						method: 'delete',
						url: `/api/logout/${this.props.auth.user.spotifyId}`
					})
				}}>Logout</a>;
		}
	}

	render() {
		return (
			<div className="container header">
				<Link to="/">
					<div className="header__logo">
						Spotify Vote
					</div>
				</Link>
				<div className="header__nav">
					<Link to="/dashboard">
						Music
					</Link>
					<Link to="/active">
						Party
					</Link>


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