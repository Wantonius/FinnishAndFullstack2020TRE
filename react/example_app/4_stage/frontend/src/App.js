import React from 'react';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import {connect} from 'react-redux';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state= {
			list:[]
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
	

	//CONTENT API
	
	getShoppingList = (search) => {
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json",
					 "token":this.props.token}			
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
					 "token":this.props.token},
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
					 "token":this.props.token}
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
					 "token":this.props.token},
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
				<Navbar/>
				<hr/>
				<Switch>
					<Route exact path="/" render={
						() => this.props.isLogged ?
						(<Redirect to="/list"/>) :
						(<LoginForm />)
					}/>
					<Route path="/form" render={
						() => this.props.isLogged ?
						(<ShoppingForm addToList={this.addToList}/>) :
						(<Redirect to="/"/>)
					}/>
					<Route path="/list" render={
						() => this.props.isLogged ?
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

const mapStateToProps = (state) => {
	return {
		isLogged:state.isLogged,
		token:state.token
	}
}

export default withRouter(connect(mapStateToProps)(App));