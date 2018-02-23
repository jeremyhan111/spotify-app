export const fetchUser = (user) => {
	return {
		type: 'FETCH_USER',
		user
	}
}

export const logOut = () => {
	return {
		type: 'LOG_OUT'
	}
};

export const placePlaylists = (playlists) => {
	return { 
		type: 'PLACE_PLAYLISTS',
		playlists
	}
}

export const addTopSong = (track) => {
	return {
		type: 'ADD_TOP_SONG',
		track
	}
}

export const removeTopSong = (track) => {
	return {
		type: 'REMOVE_TOP_SONG',
		track
	}
}