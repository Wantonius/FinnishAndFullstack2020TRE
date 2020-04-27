import React from 'react';
import {Table,Button} from 'semantic-ui-react';

export default class NormalRow extends React.Component {
	
	remove = (event) => {
		this.props.remove(event.target.name);
	}
	
	edit = (event) => {
		this.props.edit(event.target.id);
	}


	render() {
		return(
			<Table.Row>
				<Table.Cell>{this.props.item.type}</Table.Cell>
				<Table.Cell>{this.props.item.count}</Table.Cell>
				<Table.Cell>{this.props.item.price}</Table.Cell>
				<Table.Cell>
					<Button name={this.props.item._id}
							onClick={this.remove}>Remove</Button>
				</Table.Cell>
				<Table.Cell>
					<Button id={this.props.item._id}
							onClick={this.edit}>Edit</Button>
				</Table.Cell>
			</Table.Row>
		)
	}
}