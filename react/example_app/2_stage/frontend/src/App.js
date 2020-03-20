import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import LoginForm from './components/LoginForm';

export default class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state= {
			list:[],
			token:"",
			isLogged:false
		}
	}
	
	componentDidMount() {
		console.log("ComponentDidMount - App.js");
		this.getShoppingList();
	}
	
	//LOGIN API
	
	register = (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		
		fetch("/register",request).then(response => {
			if(response.ok) {
				alert("Register success");
			} else {
				console.log("Server responded with status:",response.status);
			}
		}
		).catch(error => {
			console.log("Server responded with error:",error);
		});
	} 
	
	login = (user) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(user)
		}
		fetch("/login",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						token:data.token,
						isLogged:true
					},() => {
						this.getShoppingList();
					})
				}).catch(error => {
					console.log("Error in parsing JSON:",error);
				});
			} else {
				console.log("Server responded with status:",response.status);
			}
		}).catch(error => {
			console.log("Server responded with error:",error);
		});
	}
	//CONTENT API
	
	getShoppingList = () => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json"}			
		}
		fetch("/api/shopping",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
						this.setState({
							list:data
						}) 
				}).catch(error => {
					console.log("Error in parsing JSON:",error);
				});
			}			
		}).catch(error => {
			console.log("Server responded with error:",error)
		});
	}
	
	addToList = (item) => {
		let request = {
			method:"POST",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(item)
		}
		fetch("/api/shopping",request).then(response => {
			if(response.ok) {
				this.getShoppingList();
			} else {
				console.log("Addtolist:Server responded with status:",response.status);
			}
		}
			).catch(error => {
				console.log("Server responded with error:",error);
			})
	}
	
	handleRemove = (id) => {
		let request = {
			method:"DELETE",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		}
		let url = "/api/shopping/"+id
		fetch(url,request).then(response => {
			if(response.ok) {
				this.getShoppingList();
			} else {
				console.log("HandleRemove: Server responded with status:",response.status);				
			}
		}).catch(error => {
			console.log("Server responded with error:",error);
		});
	}
	
	handleEdit = (item) => {
		let request = {
			method:"PUT",
			mode:"cors",
			headers:{"Content-type":"application/json"},
			body:JSON.stringify(item)
		}
		let url = "/api/shopping/"+item.id
		fetch(url,request).then(response => {
			if(response.ok) {
				this.getShoppingList();
			} else {
				console.log("HandleEdit:Server responded with status:",response.status);
			}
		}).catch(error => {
			console.log("Server responded with error:",error);
		});
	}
	
	render() {
		return(
			<div className="App">
				<Switch>
					<Route exact path="/" render={
						() => this.state.isLogged ?
						(<Redirect to="/list"/>) :
						(<LoginForm login={this.login}
						 register={this.register}/>)
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
							  handleEdit={this.handleEdit}/>) :
						(<Redirect to="/"/>)
					}/>				
				</Switch>
			</div>
		)
	}	
}

