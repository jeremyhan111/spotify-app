const playlistReducerDefaultState = {
	playlists: []
};

export default function(state = playlistReducerDefaultState, action) {
	console.log('reducer state', action);
	switch (action.type) {	
		case 'PLACE_PLAYLISTS':
			return {
				playlists: action.playlists
			}
		default:
			return state;
	};
};