import {logoutSuccess, loading, endLoading} from './loginActions';

export const FETCH_SHOPPINGLIST_SUCCESS = "FETCH_SHOPPINGLIST_SUCCESS"
export const FETCH_SHOPPINGLIST_FAILED = "FETCH_SHOPPINGLIST_FAILED"
export const ADD_TO_SHOPPINGLIST_SUCCESS = "ADD_TO_SHOPPINGLIST_SUCCESS"
export const ADD_TO_SHOPPINGLIST_FAILED = "ADD_TO_SHOPPINGLIST_FAILED"
export const REMOVE_FROM_SHOPPINGLIST_SUCCESS = "REMOVE_FROM_SHOPPINGLIST_SUCCESS"
export const REMOVE_FROM_SHOPPINGLIST_FAILED = "REMOVE_FROM_SHOPPINGLIST_FAILED"
export const REMOVE_SINGLE_ITEM_FROM_LIST = "REMOVE_SINGLE_ITEM_FROM_LIST"
export const EDIT_SHOPPINGITEM_SUCCESS = "EDIT_SHOPPINGITEM_SUCCESS"
export const EDIT_SHOPPINGITEM_FAILED = "EDIT_SHOPPINGITEM_FAILED"
export const CLEAR_SHOPPINGREDUCER_STATE = "CLEAR_SHOPPINGREDUCER_STATE"

//Shoppingactions

export const getShoppingList = (token,search) => {
	return dispatch => {
		let request = {
			method:"GET",
			mode:"cors",
			headers: {"Content-Type":"application/json",
					token:token}
		}
		let url = "/api/shopping"
		if(search) {
			url = url +"?type="+search;
		}
		dispatch(loading());
		fetch(url,request).then(response => {
			dispatch(endLoading());
			if(response.ok) {
				response.json().then(data => {
					dispatch(shoppingFetchSuccess(data));
				}).catch(error => {
					dispatch(shoppingFetchFailed("Failed to parse information. Try again"));
				})
			} else {
				if(response.status === 403) {
					dispatch(shoppingFetchFailed("Server responded with session failure. Logging out!"))
					dispatch(logoutSuccess());
					dispatch(clearShoppingState());
				} else {
					dispatch(shoppingFetchFailed("Server responded with an error status:"+response.statusText))
				}
			}
		}).catch(error => {
			dispatch(endLoading());
			dispatch(shoppingFetchFailed(error));
		})
	
	}
}

export const addToList = (token, item) => {
	return dispatch => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-Type":"application/json",
			token:token},
			body:JSON.stringify(item)
		}
		dispatch(loading());
		fetch("/api/shopping",request).then(response => {
			dispatch(endLoading());
			if(response.ok) {
				dispatch(shoppingAddSuccess());
				dispatch(getShoppingList(token));
			} else {
				if(response.status === 403) {
					dispatch(shoppingAddFailed("Server responded with a session failure. Logging out"));
					dispatch(logoutSuccess());
					dispatch(clearShoppingState());
				} else {
					dispatch(shoppingAddFailed("Server responded with an error status:"+response.statusText))
				}
			}
		}).catch(error => {
			dispatch(endLoading());
			dispatch(shoppingAddFailed(error));
		})
	}
}

export const removeFromList = (token, id) => {
	return dispatch => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-Type":"application/json",
			token:token}
		}
		dispatch(loading());
		let url = "/api/shopping/"+id
		fetch(url,request).then(response => {
			dispatch(endLoading());
			if(response.ok) {
				dispatch(shoppingRemoveSuccess());
				dispatch(getShoppingList(token));
			} else {
				if(response.status === 403) {
					dispatch(shoppingRemoveFailed("Server responded with a session failure. Logging out"));
					dispatch(logoutSuccess());
					dispatch(clearShoppingState());
				} else {
					dispatch(shoppingRemoveFailed("Server responded with an error:"+response.statusText));
					if(response.status === 404) {
						dispatch(shoppingRemoveSingleItem(id));
					}
				}
			}
		}).catch(error => {
			dispatch(endLoading());
			dispatch(shoppingRemoveFailed(error));
		})
	}
}

export const editItem = (token,item) => {
	console.log("editItem");
	console.log(item);
	return dispatch => {
		let request = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-Type":"application/json",
			token:token},
			body:JSON.stringify(item)
		}
		let url = "/api/shopping/"+item.id;
		dispatch(loading());
		fetch(url,request).then(response => {
			dispatch(endLoading());
			if(response.ok) {
				dispatch(editShoppingItemSuccess());
				dispatch(getShoppingList(token));
			} else {
				if (response.status === 403) {
					dispatch(editShoppingItemFailed("Server responded with session failure. Logging out"));
					dispatch(logoutSuccess());
					dispatch(clearShoppingState());
				} else {
					dispatch(editShoppingItemFailed("Server responded with status:"+response.statusText))
				}
			}
		}).catch(error => {
			dispatch(endLoading());
			dispatch(editShoppingItemFailed(error));
		})
	}
}
//Action Creators

export const shoppingFetchSuccess = (list) => {
	return {
		type:FETCH_SHOPPINGLIST_SUCCESS,
		list:list
	}
}

export const shoppingFetchFailed = (error) => {
	return {
		type:FETCH_SHOPPINGLIST_FAILED,
		error:error
	}
}

export const shoppingAddSuccess = () => {
	return {
		type:ADD_TO_SHOPPINGLIST_SUCCESS
	}
}

export const shoppingAddFailed = (error) => {
	return {
		type:ADD_TO_SHOPPINGLIST_FAILED,
		error:error
	}
}

export const shoppingRemoveSuccess = () => {
	return {
		type:REMOVE_FROM_SHOPPINGLIST_SUCCESS
	}
}

export const shoppingRemoveFailed = (error) => {
	return {
		type:REMOVE_FROM_SHOPPINGLIST_FAILED,
		error:error
	}
}

export const shoppingRemoveSingleItem = (id) => {
	return {
		type:REMOVE_SINGLE_ITEM_FROM_LIST,
		id:id
	}
}

export const editShoppingItemSuccess = () => {
	return {
		type:EDIT_SHOPPINGITEM_SUCCESS
	}
}

export const editShoppingItemFailed = (error) => {
	return {
		type:EDIT_SHOPPINGITEM_FAILED,
		error:error
	}
}

export const clearShoppingState = () => {
	return {
		type:CLEAR_SHOPPINGREDUCER_STATE
	}
}