import React from 'react'
import {Form,Button} from 'semantic-ui-react';

export default class ShoppingForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			type:"",
			price:0,
			count:0,
			id:0
		}
	}
	
	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value
		this.setState(state);
	}
	
	onSubmit = (event) => {
		event.preventDefault();
		let item = {
			type:this.state.type,
			count:this.state.count,
			price:this.state.price,
			id:0
		}
		this.props.addToList(item);
		this.setState({
			id:0,
			type:"",
			count:0,
			price:0
		})
	}
	
	render() {
		return(<Form onSubmit={this.onSubmit}>
				<Form.Field>
					<label htmlFor="type">Type:</label>
					<input type="text"
						   name="type"
						   onChange={this.onChange}
						   value={this.state.type}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="count">Count:</label>
					<input type="number"
							minimum="0"
						   name="count"
						   onChange={this.onChange}
						   value={this.state.count}/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="price">Price:</label>
					<input type="number"
						   name="price"
						   minimum="0"
							step="0.01"
						   onChange={this.onChange}
						   value={this.state.price}/>
				</Form.Field>
				<Button type="submit">Add</Button>
				</Form>
				)
	}
}