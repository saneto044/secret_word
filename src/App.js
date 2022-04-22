//CSS
import './App.css';

//React
import { useCallback, useEffect,useState } from 'react';

//Data
import {wordsList} from './data/words';

//Components
import { StartScreen } from './components/StartScreen';
import { Game } from './components/Game';
import { GameOver } from './components/GameOver';

const stages = [
  {id:1 , name:"start"},
  {id:2 , name:"game"},
  {id:3 , name:"end"},
];
 
function App() {
  
  const [gameState,setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  
  const [pickedWord,setPickedWord] = useState("");
  const [pickedCategory,setPickedCategory] = useState('')
  const [letters , setLetters] = useState([]);
  
  const [guessedLetters , setGuessedLetters] = useState([]);
  const [wrongLetters , setWrongLetters] = useState([])
  const [guesses , setGuesses] = useState(3);
  const [score, setScore] = useState(0);
  
  //console.log(words)
 const pickWordAndCategory = useCallback(() => {
   //picked a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random()* Object.keys(categories).length)];
    //pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)] 
    //console.log(category,word)
    return {category,word}
  },[words])
  
  // starts the secret word game
  const startGame = useCallback(() => {
 
    const { category, word } = pickWordAndCategory();

    console.log(category, word);

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // console.log(category, word);

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);
  //process the letter input
  const verifyLetter = (letter) => {
    console.log(letter)
    
  }
  const retry = () => {
    setGameStage(stages[0].name)
  }
  return (
    <div className="App">
      {gameState === "start" && <StartScreen startGame={startGame}/>}
      {gameState === "game" && (
      <Game 
      verifyLetter={verifyLetter}
      pickedWord={pickedWord}
      pickedCategory={pickedCategory}
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
      /> )}
      {gameState === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
