const playlistsReducerDefaultState = [];

export default function(state = playlistsReducerDefaultState, action) {
	switch (action.type) {	
		case 'REMOVE_PLAYLIST':
			return state.filter((playlist) => {
				return playlist.uri !== action.playlist.uri;
			});
		case 'ADD_PLAYLISTS':
			return [...state, action.playlist];
		default:
			return state;
	};
};