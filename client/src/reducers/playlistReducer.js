const playlistReducerDefaultState = {
	playlists: []
};

export default function(state = playlistReducerDefaultState, action) {
	switch (action.type) {	
		case 'PLACE_PLAYLISTS':
			return {
				playlists: action.playlists
			}
		case 'persist/REHYDRATE':
			return {
				playlists: action.payload.playlists.playlists
			}
		default:
			return state;
	};
};