import React from 'react';
import {Table,Button} from 'semantic-ui-react';
import NormalRow from './NormalRow';
import RemoveRow from './RemoveRow';
import EditRow from './EditRow';
import {connect} from 'react-redux';
import {getShoppingList, removeFromList} from '../actions/shoppingActions';

class ShoppingList extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			removeIndex:-1,
			editIndex:-1,
			search:""
		}
	}
	
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}	
	
	searchByType = (event) => {
		this.props.dispatch(getShoppingList(this.props.token,this.state.search));
		this.setState({
			search:""
		})
	}
	
	remove = (id) => {
		for(let i=0;i<this.props.list.length;i++) {
			if(this.props.list[i]._id === id) {
				this.setState({
					removeIndex:i,
					editIndex:-1
				})
				return;
			}
		}
	}
	
	edit = (id) => {
		for(let i=0;i<this.props.list.length;i++) {
			if(this.props.list[i]._id === id) {
				this.setState({
					removeIndex:-1,
					editIndex:i
				})
				return;
			}
		}		
	}
	
	handleRemove = (id) => {
		this.props.dispatch(removeFromList(this.props.token,id));;
		this.cancel();
	}
	
	handleEdit = (item) => {
		this.props.handleEdit(item);
		this.cancel();
	}
	
	cancel = () => {
		this.setState({
			removeIndex:-1,
			editIndex:-1
		})
	}
	
	render() {
		let items = this.props.list.map((item,index) => {
			if(this.state.editIndex === index) {
				return <EditRow key={item._id}
								item={item}
								handleEdit={this.handleEdit}
								cancel={this.cancel}/>
			}
			if(this.state.removeIndex === index) {
				return <RemoveRow key={item._id}
							      item={item}
								  handleRemove={this.handleRemove}
								  cancel={this.cancel}/>
			}
			return <NormalRow key={item._id} item={item}
				edit={this.edit} remove={this.remove}/>
		})
		return(
			<div>
				<label htmlFor="search">Search by type:</label>
				<input type="text"
						name="search"
						onChange={this.onChange}
						value={this.state.search}/>
				<Button style={{marginLeft:10}} onClick={this.searchByType}>Search</Button>
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Type</Table.HeaderCell>
							<Table.HeaderCell>Count</Table.HeaderCell>
							<Table.HeaderCell>Price</Table.HeaderCell>
							<Table.HeaderCell>Remove</Table.HeaderCell>
							<Table.HeaderCell>Edit</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{items}
					</Table.Body>
				</Table>
			</div>
		)
	}
	
}

const mapStateToProps = (state) => {
	return {
		list:state.shopping.list,
		token:state.login.token
	}
}

export default connect(mapStateToProps)(ShoppingList);