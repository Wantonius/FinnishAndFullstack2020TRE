import React from 'react';

export default class Label extends React.Component {
	render() {
		let labelstyle = {
			fontFamily:"sans-serif",
			fontWeight:"bold",
			padding:13,
			margin:0
		}
		return(
			<p style={labelstyle}>{this.props.color}</p>
		)
	}
}