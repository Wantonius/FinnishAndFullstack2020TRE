import React from 'react';
import {ThemeContext} from './ThemeContext';

const Paragraph = ({children}) => (
	<ThemeContext.Consumer>
	{theme => <p style={{color:theme.textcolor,
	backgroundColor:theme.background}}>{children}</p>}
	</ThemeContext.Consumer>
)

export default Paragraph;