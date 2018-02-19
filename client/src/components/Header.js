import React, { Component } from 'react';
import {connect} from 'react-redux';

class Header extends Component {

	renderContent() {
		switch(this.props.auth) {
			case null:
				return;
			case false:
				return <a href="/auth/spotify">Login with Spotify</a>;
			default:
				return <a href="/api/logout">Logout</a>;
		}
	}

	render() {
		return (
			<div>
				{this.renderContent()}
			</div>
		);
	}
};

const mapStateToProps = ({auth}) => {
	return { auth };
};

export default connect(mapStateToProps)(Header);