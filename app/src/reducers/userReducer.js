const userReducer = (
	state = {
		details: null,
	}, 
	action
) => {
	switch (action.type) {
		case "SET_USER_DETAILS":
		//***For when promise is used in action.
		//case "SET_USER_FULFILLED":
			state = {
				details: action.payload
			};
			break;
		default:
			break;
	}
	return state;
};

export default userReducer;