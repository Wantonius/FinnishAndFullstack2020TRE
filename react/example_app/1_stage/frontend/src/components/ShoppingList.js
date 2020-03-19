import React from 'react';
import {Table} from 'semantic-ui-react';

export default class ShoppingList extends React.Component {
	
	render() {
		let items = this.props.list.map(item => 
			<Table.Row key={item.id}>
				<Table.Cell>{item.type}</Table.Cell>
				<Table.Cell>{item.count}</Table.Cell>
				<Table.Cell>{item.price}</Table.Cell>
			</Table.Row>
		)
		return(
			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Type</Table.HeaderCell>
						<Table.HeaderCell>Count</Table.HeaderCell>
						<Table.HeaderCell>Price</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{items}
				</Table.Body>
			</Table>
		
		)
	}
	
}