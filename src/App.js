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

const guessesQty = 3 

function App() {
  
  const [gameState,setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  
  const [pickedWord,setPickedWord] = useState("");
  const [pickedCategory,setPickedCategory] = useState('')
  const [letters , setLetters] = useState([]);
  
  const [guessedLetters , setGuessedLetters] = useState([]);
  const [wrongLetters , setWrongLetters] = useState([])
  const [guesses , setGuesses] = useState(guessesQty);
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
    //clear all letter letters
    clearLetterStates();
 
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
    const normalizedLetter = letter.toLowerCase();

    //check if letter has already benn utilized
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }


    //push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter

      ])
    }else{
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ])
      setGuesses((actualGuesses) => actualGuesses - 1 );
    }

  };
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([])
  }
  useEffect(() => {
    if(guesses <= 0){
      //reset all states
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  },[guesses])
  console.log(guessedLetters);
  console.log(wrongLetters)
  
  //check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    //win condition
    if(guessedLetters.length == uniqueLetters.length){
      //add score
      setScore((actualScore) => actualScore += 100)

      //restart game with new word 
      startGame();
    }

  },[guessedLetters,letters,startGame])
  const retry = () => {
    setScore(0)
    setGuesses(3)
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
      {gameState === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
