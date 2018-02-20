export default function(state = null, action) {
	console.log(action);
	switch (action.type) {	
		case 'PLACE_PLAYLISTS':
			return action.playlists
		default:
			return state;
	};
};