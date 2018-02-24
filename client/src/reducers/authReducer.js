const authReducerDefaultState = {
	user: null
}

export default function(state = authReducerDefaultState, action) {
	switch (action.type) {
		case 'FETCH_USER':
			return {
				user: action.user
			}
		default:
			return state;
	};
};