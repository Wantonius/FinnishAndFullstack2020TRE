import React from 'react';
import {Button,Table} from 'semantic-ui-react';

export default class RemoveRow extends React.Component {
	
	cancel = () => {
		this.props.cancel();
	}
	
	handleRemove = (event) => {
		this.props.handleRemove(event.target.name);
	}
	
	
	render() {
		return(
			<Table.Row>
				<Table.Cell>{this.props.item.type}</Table.Cell>
				<Table.Cell>{this.props.item.count}</Table.Cell>
				<Table.Cell>{this.props.item.price}</Table.Cell>
				<Table.Cell>
					<Button color="red"
							onClick={this.cancel}>Cancel</Button>
				</Table.Cell>
				<Table.Cell>
					<Button color="green"
							name={this.props.item.id}
							onClick={this.handleRemove}>Confirm</Button>
				</Table.Cell>
				
			</Table.Row>
		)
	}
}