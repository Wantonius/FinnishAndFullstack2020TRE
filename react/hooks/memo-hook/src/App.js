import React,{useState,useMemo} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	
	const [count,setCount] = useState(0)
	const [currentWord,setCurrentWord] = useState(0)
	const words = ['banaani','omena','olut','loma']
	const word = words[currentWord]
	
	const computeWordLength = word => {
		let i=0;
		while(i<1000000000) i++;
		return word.length
	}
	
	//const wordLength = computeWordLength(word);
	const wordLength = useMemo(() => computeWordLength(word),[word])
	
	return(
		<div className="App">
			<h2>Compute the length of the word</h2>
			<h2>{word} has {wordLength} letters</h2>
			
			<button
			onClick={() => {
				const next = currentWord +1 === words.length ? 0 : currentWord+1;
				setCurrentWord(next);
			}}>Next Word</button>
		
			<h2>Increment Counter</h2>
			<p>Counter:{count}</p>
			<button onClick={() => setCount(count+1)}>Increment</button>
			
		</div>
	)
	

}

export default App;
