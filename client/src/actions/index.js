export const fetchUser = (user) => {
	return {
		type: 'FETCH_USER',
		user
	}

}

export const placePlaylists = (playlists) => {
	return { 
		type: 'PLACE_PLAYLISTS',
		playlists
	}
}