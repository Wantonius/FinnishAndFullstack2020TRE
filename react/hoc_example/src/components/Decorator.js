import React from 'react';

const Decorator = (DecoratedComponent) => {
	return class extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				color:"red"
			}
		}
		
		update = (event) => {
			let state = {};
			state[event.target.name] = event.target.value;
			this.setState(state)
		}
		
		render() {
			return (
				<div>
					<DecoratedComponent
					{...this.props}
					color={this.state.color}/>
					<br/>
					<input type="text"
							name="color"
							onChange={this.update}
							value={this.state.color}/>
				</div>
			)
			
		}
	}
}

export default Decorator;