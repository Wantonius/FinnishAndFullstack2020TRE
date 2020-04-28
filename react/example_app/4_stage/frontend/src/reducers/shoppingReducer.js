import {
	FETCH_SHOPPINGLIST_SUCCESS,
	FETCH_SHOPPINGLIST_FAILED,
	ADD_TO_SHOPPINGLIST_SUCCESS,
	ADD_TO_SHOPPINGLIST_FAILED,
	REMOVE_FROM_SHOPPINGLIST_SUCCESS,
	REMOVE_FROM_SHOPPINGLIST_FAILED,
	REMOVE_SINGLE_ITEM_FROM_LIST,
	EDIT_SHOPPINGITEM_SUCCESS,
	EDIT_SHOPPINGITEM_FAILED,
	CLEAR_SHOPPINGREDUCER_STATE	
} from '../actions/shoppingActions';

const getInitialStateFromStorage = () => {
	if(sessionStorage.getItem("shoppingstate")) {
		let state = JSON.parse(sessionStorage.getItem("shoppingstate"));
		return state;
	} else {
		return {
			list:[],
			error:""
		}
	}
}

const saveStateToStorage = (state) => {
	sessionStorage.setItem("shoppingstate",JSON.stringify(state));
}

const initialState = getInitialStateFromStorage();

const shoppingReducer = (state = initialState, action) => {
	console.log(state);
	let tempState = {};
	switch(action.type) {
		case FETCH_SHOPPINGLIST_SUCCESS:
			tempState = {
				list:action.list,
				error:""
			}
			saveStateToStorage(tempState);
			return tempState;
		case FETCH_SHOPPINGLIST_FAILED:
			tempState= {
				...state,
				error:action.error
			}
			saveStateToStorage(tempState);
			return tempState;
		case ADD_TO_SHOPPINGLIST_SUCCESS:
			tempState = {
				...state,
				error:""
			}
			saveStateToStorage(tempState);
			return tempState;
		case ADD_TO_SHOPPINGLIST_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveStateToStorage(tempState);
			return tempState;
		case REMOVE_FROM_SHOPPINGLIST_SUCCESS:
			tempState = {
				...state,
				error:""
			}
			saveStateToStorage(tempState);
			return tempState;
		case REMOVE_FROM_SHOPPINGLIST_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveStateToStorage(tempState);
			return tempState;
		case REMOVE_SINGLE_ITEM_FROM_LIST:
			let tempList = []
			for(let i=0;i<state.list.length;i++) {
				if(state.list[i]._id !== action.id) {
					tempList.push(state.list[i]);
				}
			}
			tempState = {
				...state,
				list:tempList
			}
			saveStateToStorage(tempState);
			return tempState;
		case EDIT_SHOPPINGITEM_SUCCESS:
			tempState = {
				...state,
				error:""
			}
			saveStateToStorage(tempState);
			return tempState;
		case EDIT_SHOPPINGITEM_FAILED:
			tempState = {
				...state,
				error:action.error
			}
			saveStateToStorage(tempState);
			return tempState;
		case CLEAR_SHOPPINGREDUCER_STATE:
			tempState = {
				list:[],
				error:""
			}
			saveStateToStorage(tempState);
			return tempState;
		default:
			return state;
	}
}

export default shoppingReducer;