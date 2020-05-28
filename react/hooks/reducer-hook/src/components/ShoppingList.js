import React from 'react';
import {Table,Button} from 'semantic-ui-react';

const ShoppingList = ({list,removeFromList}) => {

	let items = list.map((item) => {
		return <Table.Row key={item.id}>
					<Table.Cell>{item.type}</Table.Cell>
					<Table.Cell>{item.count}</Table.Cell>
					<Table.Cell>{item.price}</Table.Cell>
					<Table.Cell><Button 
					onClick={() => removeFromList(item.id)}>Remove
					</Button></Table.Cell>
				</Table.Row>
	})
	
	return(
		<Table>
			<Table.Header>
				<Table.HeaderCell>Type</Table.HeaderCell>
				<Table.HeaderCell>Count</Table.HeaderCell>
				<Table.HeaderCell>Price</Table.HeaderCell>
				<Table.HeaderCell>Remove</Table.HeaderCell>
			</Table.Header>
			<Table.Body>
			{items}
			</Table.Body>
		</Table>
	)
}

export default ShoppingList;