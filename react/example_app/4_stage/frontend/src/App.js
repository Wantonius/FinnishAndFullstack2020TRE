import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';

export default class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state= {
			list:[],
			token:"",
			isLogged:false,
			loading:false
		}
	}
	
	componentDidMount() {
		if(sessionStorage.getItem("state")) {
			let state = JSON.parse(sessionStorage.getItem("state"));
			this.setState(state,() => {
				if(this.state.isLogged) {
					this.getShoppingList();
				}
			})
		}
	}
	
	//HELPER FUNCTIONS
	
	saveToStorage = () => {
		sessionStorage.setItem("state",JSON.stringify(this.state));
	}
	
	changeLoadingState = (loading) => {
		this.setState({
			loading:loading
		})
	}
	
	
	sessionExpired = () => {
		this.setState({
			isLogged:false,
			token:"",
			loading:false,
			list:[]
		}, () => {
			this.saveToStorage()
		})
	}
	//LOGIN API
	

	
	login = (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		this.changeLoadingState(true);
		fetch("/login",request).then(response => {
			this.changeLoadingState(false);
			if(response.ok) {				
				response.json().then(data => {
					this.setState({
						token:data.token,
						isLogged:true
					},() => {
						this.getShoppingList();
						this.saveToStorage();
					})
				}).catch(error => {
					console.log("Error in parsing JSON:",error);
				});
			} else {
				console.log("Server responded with status:",response.status);
			}
		}).catch(error => {
			this.changeLoadingState(false);
			console.log("Server responded with error:",error);
		});
	}
	
	logout = () => {
		let request = {
			method:"POST",
			mode:"cors",			
			headers:{"Content-type":"application/json",
					 "token":this.state.token}			
		}
		this.changeLoadingState(true);
		fetch("/logout",request).then(response => {
			this.changeLoadingState(false);
			this.setState({
				list:[],
				token:"",
				isLogged:false
			}, () => {
				this.saveToStorage();
			})
		}).catch(error => {
				this.setState({
				list:[],
				token:"",
				isLogged:false
			}, () => {
				this.saveToStorage();
			})
			this.changeLoadingState(false);
			console.log("Server responded with error:",error);
		})
	}
	//CONTENT API
	
	getShoppingList = (search) => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					 "token":this.state.token}			
		}
		this.changeLoadingState(true);
		let url = "/api/shopping"
		if(search) {
			url = url+"?type="+search;
		}
		fetch(url,request).then(response => {
			this.changeLoadingState(false);
			if(response.ok) {
				response.json().then(data => {
						this.setState({
							list:data
						},() => {
							this.saveToStorage();
						}) 
				}).catch(error => {
					console.log("Error in parsing JSON:",error);
				});
			} else {
				if(response.status === 403) {
					this.sessionExpired();
				}
				console.log("Server responded with status:"+response.status);
			}			
		}).catch(error => {
			this.changeLoadingState(false);
			console.log("Server responded with error:",error)
		});
	}
	
	addToList = (item) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json",
					 "token":this.state.token},
			body:JSON.stringify(item)
		}
		this.changeLoadingState(true);
		fetch("/api/shopping",request).then(response => {
			this.changeLoadingState(false);
			if(response.ok) {
				this.getShoppingList();
			} else {
				if(response.status === 403) {
					this.sessionExpired();
				}
				console.log("Server responded with status:"+response.status);
			}		
		}
			).catch(error => {
				this.changeLoadingState(false);
				console.log("Server responded with error:",error);
			})
	}
	
	handleRemove = (id) => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json",
					 "token":this.state.token}
		}
		let url = "/api/shopping/"+id
		this.changeLoadingState(true);
		fetch(url,request).then(response => {
			this.changeLoadingState(false);
			if(response.ok) {
				this.getShoppingList();
			} else {
				if(response.status === 403) {
					this.sessionExpired();
				}
				console.log("Server responded with status:"+response.status);
			}		
		}).catch(error => {
			this.changeLoadingState(false);
			console.log("Server responded with error:",error);
		});
	}
	
	handleEdit = (item) => {
		let request = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-type":"application/json",
					 "token":this.state.token},
			body:JSON.stringify(item)
		}
		this.changeLoadingState(true);
		let url = "/api/shopping/"+item.id
		fetch(url,request).then(response => {
			this.changeLoadingState(false);
			if(response.ok) {
				this.getShoppingList();
			} else {
				if(response.status === 403) {
					this.sessionExpired();
				}
				console.log("Server responded with status:"+response.status);
			}		
		}).catch(error => {
			this.changeLoadingState(false);
			console.log("Server responded with error:",error);
		});
	}
	
	render() {
		return(
			<div className="App">
				<Navbar isLogged={this.state.isLogged}
						logout={this.logout}
						/>
				<hr/>
				<Switch>
					<Route exact path="/" render={
						() => this.state.isLogged ?
						(<Redirect to="/list"/>) :
						(<LoginForm login={this.login}/>)
					}/>
					<Route path="/form" render={
						() => this.state.isLogged ?
						(<ShoppingForm addToList={this.addToList}/>) :
						(<Redirect to="/"/>)
					}/>
					<Route path="/list" render={
						() => this.state.isLogged ?
						(<ShoppingList list={this.state.list} 
							  handleRemove={this.handleRemove}
							  handleEdit={this.handleEdit}
							  getList={this.getShoppingList}/>) :
						(<Redirect to="/"/>)
					}/>				
				</Switch>
			</div>
		)
	}	
}

