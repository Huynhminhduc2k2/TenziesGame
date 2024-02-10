import React from 'react';
import './styles.css';
import Dice from './components/Dice';
import Confetti from 'react-confetti';
import { nanoid } from 'nanoid';

export default function App() {
  const [tenzies, setTenzies] = React.useState(false);

  const [dice, setDice] = React.useState(diceArray());

  React.useEffect(() => {
    const allHeld = dice.every((dice) => dice.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(
      (eachDice) => eachDice.value === firstValue
    );
    if (allSameValue && allHeld) {
      setTenzies(true);
      console.log('You won !');
    }

    console.log('Dice State Changed !');
  }, dice);

  function diceArray() {
    const newDiceArray = [];
    for (let i = 0; i < 10; i++) {
      newDiceArray.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDiceArray;
  }

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDice(diceArray());
    } else {
      setDice((oldDice) =>
        oldDice.map((dice) => {
          return dice.isHeld ? dice : generateNewDice();
        })
      );
    }
  }

  function holdDice(id) {
    console.log(id);
    setDice((oldDice) =>
      oldDice.map((chosenDice) => {
        return chosenDice.id === id
          ? { ...chosenDice, isHeld: !chosenDice.isHeld }
          : chosenDice;
      })
    );
  }

  const diceElements = dice.map((item) => (
    <Dice key={item.id} {...item} setHold={holdDice} />
  ));

  return (
    <main className="main">
      {tenzies && <Confetti />}

      <div className="main--container">
        <h1 className="main--title">Tenzies</h1>
        <p className="main--intro">
          Roll until all dice are the same. Click each dice to freeze it at its
          current value between rolls.
        </p>

        <div className="list--dice">{diceElements}</div>

        <button className="btn" onClick={rollDice}>
          {tenzies ? 'New Game' : 'Roll'}
        </button>
      </div>
    </main>
  );
}
