import React from 'react';
import LoggerContext from '../provider/LoggerContext';

const HocLogger = (Component) => {
	return class extends React.Component {
		render() {
			return (
				<LoggerContext.Consumer>
				{state => <Component {...this.props} logger={state}/>}
				</LoggerContext.Consumer>
			
			)			
		}
		
	}
	
}

export default HocLogger;