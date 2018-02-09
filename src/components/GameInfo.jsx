import React, { PropTypes } from 'react';

const style = () => {
  return {
    container: {
      textAlign: 'center'
    },
    info: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-around'
    }
  };
};

const GameInfo = ({
  timeElapsed,
  playerScore
}) => {
  const { container, info } = style();
  return (
    <div style={container}>
      <h3>React App: Simple board game example.</h3>
      <div style={info}>
        <p>Time: {timeElapsed}</p>
        <p>Score: {playerScore}</p>
      </div>
    </div>
  )
}

GameInfo.propTypes = {
  timeElapsed: PropTypes.number.isRequired,
  playerScore: PropTypes.number.isRequired
};

export default GameInfo;
