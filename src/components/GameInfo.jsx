import React, { PropTypes } from 'react';

const style = () => {
  return {
    container: {
      textAlign: 'center',
      marginTop: '90px'
    },
    info: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'space-around'
    },
    player: {
      width: '20px',
      height: '20px',
      backgroundColor: 'black',
      transition: 'all 0.1s ease'
    },
    enemies: {
      easy: {
        width: '20px',
        height: '20px',
        backgroundColor: 'green',
        transition: 'all 0.1s ease'
      },
      medium: {
        width: '20px',
        height: '20px',
        backgroundColor: 'darkgrey',
        transition: 'all 0.1s ease'
      },
      hard: {
        width: '20px',
        height: '20px',
        backgroundColor: 'firebrick',
        transition: 'all 0.1s ease'
      }
    },
    text: {
      marginTop: '30px'
    }
  };
};

const GameInfo = ({
  timeElapsed,
  playerScore
}) => {
  const { container, info, player, enemies, text } = style();
  return (
    <div style={container}>
      <h3>Simple board game example.</h3>
      <p>Use the arrow keys to move your player.</p>
      <p>Try to avoid enemies to increase your score.</p>
      <p>Enemies go faster as the timer increases.</p>
      <div style={info}>
        <p>Time: {timeElapsed}</p>
        <p>Score: {playerScore}</p>
      </div>
      <div style={info}>
        <div style={player}>
          <p style={text}>Player</p>
        </div>
        <div style={enemies.easy}>
          <p style={text}>Easy enemies</p>
        </div>
        <div style={enemies.medium}>
          <p style={text}>Medium enemies</p>
        </div>
        <div style={enemies.hard}>
          <p style={text}>Hard enemies</p>
        </div>
      </div>
    </div>
  )
}

GameInfo.propTypes = {
  timeElapsed: PropTypes.number.isRequired,
  playerScore: PropTypes.number.isRequired
};

export default GameInfo;
