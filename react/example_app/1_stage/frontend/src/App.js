import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingList from './components/ShoppingList';
import ShoppingForm from './components/ShoppingForm';

export default class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state= {
			list:[]
		}
	}
	
	componentDidMount() {
		console.log("ComponentDidMount - App.js");
		this.getShoppingList();
	}
	
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
	
	render() {
		return(
			<div className="App">
				<ShoppingForm addToList={this.addToList}/>
				<hr/>
				<ShoppingList list={this.state.list} handleRemove={this.handleRemove}/>
			</div>
		)
	}	
}

