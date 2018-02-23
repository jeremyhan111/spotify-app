const authReducerDefaultState = {
	user: null
}

export default function(state = authReducerDefaultState, action) {
	console.log('auth reducer', action, state);

	switch (action.type) {
		case 'FETCH_USER':
			return {
				user: action.user
			}
		// case 'persist/REHYDRATE':
		// 	return {
		// 		user: action.payload.auth.user
		// 	}
		default:
			return state;
	};
};