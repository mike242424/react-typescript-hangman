interface WordProps {
  wordToGuess: string;
  guessedLetters: string[];
  reveal?: boolean;
}

const Word = ({ guessedLetters, wordToGuess, reveal = false }: WordProps) => {
  return (
    <div className="word-wrapper">
      {wordToGuess.split("").map((letter, i) => {
        return (
          <span className="word-underline" key={i}>
            <span
              style={{
                visibility:
                  guessedLetters.includes(letter) || reveal
                    ? "visible"
                    : "hidden",
                    color: !guessedLetters.includes(letter) && reveal ? "#ff0000" : "#000",
              }}
            >
              {letter}
            </span>
          </span>
        );
      })}
    </div>
  );
};

export default Word;
