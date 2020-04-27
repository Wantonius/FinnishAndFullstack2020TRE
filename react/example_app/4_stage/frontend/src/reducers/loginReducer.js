import {
	LOADING,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED
} from '../actions/loginActions';

let initialState = {
	loading:false,
	isLogged:false,
	token:"",
	error:""
}

const loginReducer = (state = initialState, action) => {
	let tempState = {}
	switch(action.type) {
		case LOADING: 
			return {
				...state,
				loading:true,
				error:""
			}
		case REGISTER_SUCCESS:
			tempState = {
				...state,
				error:"",
				loading:false
			}
			return tempState;
		case REGISTER_FAILED: 
			tempState = {
				...state,
				error:action.error,
				loading:false
			}
			return tempState;
		case LOGIN_SUCCESS: 
			tempState= {
				isLogged:true,
				token:action.token,
				error:"",
				loading:false
			}
			return tempState;
		case LOGIN_FAILED:
			tempState = {
				...state,
				error:action.error,
				loading:false
			}
			return tempState;
		case LOGOUT_SUCCESS:
			tempState = {
				error:"",
				isLogged:false,
				loading:false,
				token:""
			}
			return tempState;
		case LOGOUT_FAILED:
			tempState = {
				error:action.error,
				isLogged:false,
				loading:false,
				token:""
			}
			return tempState;
		default:
			return state;
	}
	
}

export default loginReducer;