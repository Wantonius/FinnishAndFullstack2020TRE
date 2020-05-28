import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ShoppingForm from './components/ShoppingForm';
import ShoppingList from './components/ShoppingList';

function App() {
	
	const [appState,setState] = useState({
		list:[],
		id:100
	})
	
	const addToList = (item) => {
		item.id = appState.id;
		let tempId = appState.id+1
		setState({
			list:appState.list.concat(item),
			id:tempId
		})
	}
	
	const removeFromList = (id) => {
		let tempId = parseInt(id,10);
		let tempList = appState.list.filter(item => item.id !== tempId)
		setState({
			...appState,
			list:tempList
		})
	}
	
	return (
		<div className="App">
			<ShoppingForm addToList={addToList}/>
			<hr/>
			<ShoppingList list={appState.list} removeFromList={removeFromList}/>
		</div>
	);
}

export default App;
