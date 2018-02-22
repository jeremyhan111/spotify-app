import { omit } from 'lodash';

const topSongReducerDefaultState = {
	topSongs: {}
};

export default function(state = topSongReducerDefaultState, action) {
	switch (action.type) {	
		case 'REMOVE_TOP_SONG':
			return {
				topSongs: omit(state.topSongs, action.track)
			};
		case 'ADD_TOP_SONG':
			var newState = {
				topSongs: {
					...state.topSongs
				}
			}

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