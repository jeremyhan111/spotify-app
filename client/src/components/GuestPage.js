import React from 'react';
import VotingSystem from './VotingSystem';

const GuestPage = (props) => {
	return (
		<div>
			<VotingSystem id={props.match.params.id}/>
		</div>
	)
};

export default GuestPage;