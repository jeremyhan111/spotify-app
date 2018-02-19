import { FETCH_PLAYLISTS } from '../actions/types'

export default function(state = null, action) {
	console.log(action);
	switch (action.type) {
		case FETCH_PLAYLISTS:
			
		default:
			return state;
	};
};