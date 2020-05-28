import React, {useState} from 'react';
import {Form,Button} from 'semantic-ui-react';

const ShoppingForm = ({addToList}) => {

	const [item,setItem] = useState({
		type:"",
		count:0,
		price:0
	})
	
	const onChange = (event) => {
		setItem({
			...item,
			[event.target.name]:event.target.value
		})
	}
	
	const onSubmit = (event) => {
		event.preventDefault();
		addToList(item);
		setItem({
			type:"",
			count:0,
			price:0
		})
	}

	return(
		<Form onSubmit={onSubmit}>
			<Form.Field>
				<label htmlFor="type">Type</label>
				<input type="text"
						name="type"
						onChange={onChange}
						value={item.type}/>
			</Form.Field>
			<Form.Field>
				<label htmlFor="count">Count</label>
				<input type="number"
						name="count"
						onChange={onChange}
						value={item.count}/>
			</Form.Field>
			<Form.Field>
				<label htmlFor="price">Price</label>
				<input type="number"
						name="price"
						onChange={onChange}
						value={item.price}/>
			</Form.Field>
			<Button type="submit">Add</Button>
		</Form>
	
	)
}

export default ShoppingForm;