import React, { Component } from 'react';
import {connect} from 'react-redux';

class Header extends Component {

	renderContent() {
		switch(this.props.auth) {
			case null:
				return 'Logging in'
			case false:
				return 'Please Log In'
			default:
				return 'Hello'
		}
	}

	render() {
		return (
			<div>
				<p>{this.renderContent()}</p>
			</div>
		);
	}
};

const mapStateToProps = ({auth}) => {
	return { auth };
};

export default connect(mapStateToProps)(Header);