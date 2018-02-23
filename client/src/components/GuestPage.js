import React from 'react';
import VotingSystem from './VotingSystem';
import { Link } from 'react-router-dom'

const GuestPage = () => {
	return (
		<div>
			<VotingSystem />
			<Link to="/active">Go back</Link>
		</div>
	)
};

export default GuestPage;