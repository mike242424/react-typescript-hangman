import { useCallback, useEffect, useState } from "react";
import axios from "axios";
// import words from "./wordList.json";
import Drawing from "./components/Drawing";
import Word from "./components/Word";
import Letters from "./components/Letters";

const App = () => {
  const [wordToGuess, setWordToGuess] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [isLoading, setIsloading] = useState(false);

  // Filter out incorrect letters (letters not in the word to guess)
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  // if incorrect letters is greater than or equal to 6 (number of body parts to display), you lose
  const isLoser = incorrectLetters.length >= 6;

  // if every letter is included in guessed letters, you win
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  // Prevents duplicate letters and updates guessedLetters state
  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isWinner || isLoser) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser]
  );

  useEffect(() => {
    setIsloading(true);
    axios
      .get("https://random-word-api.vercel.app/api?words=1")
      .then((res) => {
        setWordToGuess(res.data[0]);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // hooking up event listener for computer keyboard
    const handleKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      // regex checks did we press a letter between a and z
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };
    document.addEventListener("keypress", handleKeyDown);

    return () => {
      document.removeEventListener("keypress", handleKeyDown);
    };
  }, [guessedLetters]);

  return (
    <div className="wrapper">
      <h1>
        <strong>Hangman</strong>
      </h1>
      {isLoading ? (
        <div className="loading">Loading Game...</div>
      ) : (
        <>
          <div className="winner-loser">
            {isWinner && "Winner! Refresh page to try again!"}
            {isLoser && "Good Try. Refresh page to try again."}
          </div>
          <Drawing numberOfGuesses={incorrectLetters.length} />
          <Word
            guessedLetters={guessedLetters}
            wordToGuess={wordToGuess}
            reveal={isLoser}
          />
          <Letters
            activeLetters={guessedLetters.filter((letter) =>
              wordToGuess.includes(letter)
            )}
            inactiveLetters={incorrectLetters}
            addGuessedLetter={addGuessedLetter}
            disabled={isWinner || isLoser}
          />
        </>
      )}
    </div>
  );
};

export default App;
