import { combineReducers } from 'redux';
import authReducer from './authReducer';
import playlistReducer from './playlistReducer';
import topSongReducer from './topSongReducer';

export default combineReducers({
	auth: authReducer,
	playlists: playlistReducer,
	topSongs: topSongReducer
});