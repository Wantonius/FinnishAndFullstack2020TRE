import React from 'react';
import {ThemeContext} from './ThemeContext';

const ThemeButton = ({toggleTheme}) =>(
	<ThemeContext.Consumer>
	{theme => <button style={{color:theme.textcolor,
		backgroundColor:theme.background}}
	onClick={() => toggleTheme()}>Toggle Theme</button>}
	</ThemeContext.Consumer>
)

export default ThemeButton;