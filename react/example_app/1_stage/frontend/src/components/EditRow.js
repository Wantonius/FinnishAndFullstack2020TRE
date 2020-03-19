import React from 'react';
import {Button,Table} from 'semantic-ui-react';

export default class EditRow extends React.Component {
	
	constructor(props) {
		super(props)
		this.state = {
			type:props.item.type,
			price:props.item.price,
			count:props.item.count
		}
	}

	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		this.setState(state);
	}

	handleEdit = (event) => {
		let item = {
			id:this.props.item.id,
			type:this.state.type,
			count:this.state.count,
			price:this.state.price
		}
		this.props.handleEdit(item);
	}
	
	cancel = (event) => {
		this.props.cancel();
	}

	render() {
		return(
			<Table.Row>
				<Table.Cell>
					<input type="text"
							name="type"
							onChange={this.onChange}
							value={this.state.type}/>
				</Table.Cell>
				<Table.Cell>
					<input type="number"
							name="count"
							onChange={this.onChange}
							value={this.state.count}
							minimum="0"/>
				</Table.Cell>
				<Table.Cell>
					<input type="number"
							name="price"
							onChange={this.onChange}
							value={this.state.price}
							minimum="0"
							step="0.01"/>
				</Table.Cell>
				<Table.Cell>
					<Button color="green"
							onClick={this.handleEdit}>Save</Button>
				</Table.Cell>
				<Table.Cell>
					<Button color="red"
							onClick={this.cancel}>Cancel</Button>
				</Table.Cell>
			</Table.Row>
		)	
	}
}