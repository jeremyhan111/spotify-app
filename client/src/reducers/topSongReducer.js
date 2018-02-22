const topSongReducerDefaultState = {
	topSongs: {}
};

export default function(state = topSongReducerDefaultState, action) {
	switch (action.type) {	
		case 'ADD_TOP_SONG':
			var newState = {
				topSongs: {
					...state.topSongs
				}
			}

			console.log(action)

			if (action.track.name in state.topSongs) {
				newState.topSongs[action.track.name] += 1
			} else {
				newState.topSongs[action.track.name] = 1
			}

			return newState;
		default:
			return state;
	};
};