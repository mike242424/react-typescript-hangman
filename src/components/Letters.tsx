const keys = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

interface LettersProps {
  activeLetters: string[];
  inactiveLetters: string[];
  disabled?: boolean;
  addGuessedLetter: (letter: string) => void;
}

const Letters = ({
  activeLetters,
  inactiveLetters,
  disabled = false,
  addGuessedLetter,
}: LettersProps) => {
  return (
    <div className="letter-wrapper">
      {keys.map((key) => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);

        return (
          <button
            className={`letter-button ${isActive ? "active" : ""} ${
              isInactive ? "inactive" : ""
            }` }
            key={key}
            onClick={() => addGuessedLetter(key)}
            disabled={isActive || isInactive || disabled}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};

export default Letters;
