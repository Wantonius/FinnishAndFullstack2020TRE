import React from 'react';
import {ThemeContext} from './ThemeContext';

const Headline = ({children}) => (
	<ThemeContext.Consumer>
	{theme => <h1 style={{color:theme.textcolor,
		backgroundColor:theme.background}}>{children}</h1>}
	</ThemeContext.Consumer>
)

export default Headline;