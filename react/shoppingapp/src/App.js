import React from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingList from './ShoppingList';
import ShoppingForm from './ShoppingForm';

export default class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state= {
			id:100,
			list:[]
		}
	}
	addToList = (item) => {
		item.id = this.state.id;
		let tempList = this.state.list.concat(item);
		let tempId = this.state.id+1;
		this.setState({
			id:tempId,
			list:tempList
		})
	}
	
	render() {
		return(
			<div className="App">
				<ShoppingForm addToList={this.addToList}/>
				<hr/>
				<ShoppingList list={this.state.list}/>
			</div>
		)
	}	
}

