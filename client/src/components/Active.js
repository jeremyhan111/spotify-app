import React from 'react';
import { connect } from 'react-redux';

const Active = () => {
	return (
		<div>
			<h1>Active Page</h1>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		playlists: state.playlists
	}
}

export default connect()(Active);