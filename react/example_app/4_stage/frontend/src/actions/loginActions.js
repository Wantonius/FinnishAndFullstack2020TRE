//Action Constants

export const LOADING = "LOADING"
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"
export const REGISTER_FAILED = "REGISTER_FAILED"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS"
export const LOGOUT_FAILED = "LOGOUT_FAILED";

//Actions

export const onRegister = (user) => {
	return dispatch => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		dispatch(loading());
		fetch("/register",request).then(response => {
				if(response.ok) {
					alert("Register success!");
					dispatch(registerSuccess());
				} else {
					dispatch(registerFailed("Register failed. Is username already in use?"));
				}
		}).catch(error => {
			dispatch(registerFailed(error));
		});
	}
}

export const onLogin = (user) => {
	return dispatch => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
			}
	dispatch(loading());
	fetch("/login",request).then(response => {
		if(response.ok) {
			response.json().then(data => {
				dispatch(loginSuccess(data.token));
			}).catch(error => {
				dispatch(loginFailed("Failed to parse user information. Try again!"));
			});
		} else {
			dispatch(loginFailed("Login failed. Please provide proper credentials"));
		}
	}).catch(error => {
		dispatch(loginFailed(error));
	})
}
}

export const onLogout = (token) => {
	return dispatch => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
				token:token}		
		}
		dispatch(loading());
		fetch("/logout",request).then(response => {
			if(response.ok) {
				dispatch(logoutSuccess());
			} else {
				dispatch(logoutFailed("Server responded with an error. Logging out"));
			}
		}).catch(error => {
			dispatch(logoutFailed("Server responded with an error:"+error));
		})
		
	}
}
//Action Creators

export const loading = () => {
	return {
		type:LOADING 
	}
}

export const registerSuccess = () => {
	return {
		type:REGISTER_SUCCESS
	}
}

export const registerFailed = (error) => {
	return {
		type:REGISTER_FAILED,
		error:error
	}
}

export const loginSuccess = (token) => {
	return {
		type:LOGIN_SUCCESS,
		token:token
	}
}

export const loginFailed = (error) => {
	return {
		type:LOGIN_FAILED,
		error:error
	}
}

export const logoutSuccess = () => {
	return {
		type:LOGOUT_SUCCESS
	}
}

export const logoutFailed = (error) => {
	return {
		type:LOGOUT_FAILED
	}
}