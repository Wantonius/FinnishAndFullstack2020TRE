import {
	LOADING,
	END_LOADING,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED
} from '../actions/loginActions';

const getInitialStateFromStorage = () => {
	if(sessionStorage.getItem("loginstate")) {
		let loginstate = JSON.parse(sessionStorage.getItem("loginstate"));
		return loginstate
	} else {
		return {
			loading:false,
			isLogged:false,
			token:"",
			error:""
		}
	}
}

let initialState = getInitialStateFromStorage();

const saveLoginState = (state) => {
	sessionStorage.setItem("loginstate",JSON.stringify(state));
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
		case END_LOADING:
			return {
				...state,
				loading:false,
				error:""
			}
		case REGISTER_SUCCESS:
			tempState = {
				...state,
				error:"",
				loading:false
			}
			saveLoginState(tempState);
			return tempState;
		case REGISTER_FAILED: 
			tempState = {
				...state,
				error:action.error,
				loading:false
			}
			saveLoginState(tempState);
			return tempState;
		case LOGIN_SUCCESS: 
			tempState= {
				isLogged:true,
				token:action.token,
				error:"",
				loading:false
			}
			saveLoginState(tempState);
			return tempState;
		case LOGIN_FAILED:
			tempState = {
				...state,
				error:action.error,
				loading:false
			}
			saveLoginState(tempState);
			return tempState;
		case LOGOUT_SUCCESS:
			tempState = {
				error:"",
				isLogged:false,
				loading:false,
				token:""
			}
			saveLoginState(tempState);
			return tempState;
		case LOGOUT_FAILED:
			tempState = {
				error:action.error,
				isLogged:false,
				loading:false,
				token:""
			}
			saveLoginState(tempState);
			return tempState;
		default:
			return state;
	}
	
}

export default loginReducer;