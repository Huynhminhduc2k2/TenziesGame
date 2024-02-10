import React from 'react';

export default function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : 'white',
  };

  return (
    <h2 style={styles} className="dice" onClick={() => props.setHold(props.id)}>
      {props.value}
    </h2>
  );
}
