const head = <div className="head"></div>;
const body = <div className="body"></div>;
const rightArm = <div className="right-arm"></div>;
const leftArm = <div className="left-arm"></div>;
const leftLeg = <div className="left-leg"></div>;
const rightLeg = <div className="right-leg"></div>;

const bodyParts = [head, body, rightArm, leftArm, rightLeg, leftLeg];

interface DrawingProps {
  numberOfGuesses: number;
}

const Drawing = ({ numberOfGuesses }: DrawingProps) => {
  return (
    <div className="hangman-container">
     {bodyParts.slice(0, numberOfGuesses)}
      <div className="drop-down-bar"></div>
      <div className="top-bar"></div>
      <div className="middle-bar"></div>
      <div className="bottom-bar"></div>
    </div>
  );
};

export default Drawing;
