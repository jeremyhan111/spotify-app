import axios from 'axios';

export const fetchUser = () => (async (dispatch) => {
		const res = await axios.get('/api/current_user');
		dispatch({ type: 'FETCH_USER', payload: res.data });
	}
);

export const placePlaylists = (playlists) => {
	return { 
		type: 'PLACE_PLAYLISTS',
		playlists
	}
}