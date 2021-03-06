import React, { Component } from 'react';
import { GameInfo, Board, Player, Enemy, Header } from 'components';

import { UP, DOWN, LEFT, RIGHT, EASY, MEDIUM, HARD, getElement } from 'helpers/utils';

// Game attributes at start
const getDefaultState = ({ boardSize, playerSize }) => {
  const half = Math.floor(boardSize / 2) * playerSize;
  return {
    size: {
      board: boardSize,
      player: playerSize,
      maxDim: boardSize * playerSize
    },
    positions: {
      player: {
        top: half,
        left: half
      },
      enemies: []
    },
    playerScore: 0,
    timeElapsed: 0,
    enemySpeed: 0,
    enemyIndex: 0,
    activeEnemies: 1,
    baseScore: 10
  }
};

export default class Game extends Component {
  constructor(props) {
    super(props);
    const half = Math.floor(props.boardSize / 2) * props.playerSize;
    const { boardSize, playerSize } = props;
    this.state = getDefaultState({ boardSize, playerSize });
  }

  placeEnemy = () => {
    const { player, maxDim } = this.state.size;
    const { player: playerPos } = this.state.positions;

    // Assign to a random side and difficulty
    const side = getElement([UP, DOWN, LEFT, RIGHT]);
    const type = getElement([EASY, MEDIUM, HARD]);

    // Generate enemy object
    const newEnemy = this.generateNewEnemy(playerPos, side, type);

    // Update game state
    this.setState({
      positions: {
        ...this.state.positions,
        enemies: [...this.state.positions.enemies].concat(newEnemy)
      }
    });
  }

  generateNewEnemy = (position, side, type) => {
    // Update game state
    this.setState({
      enemyIndex: this.state.enemyIndex + 1
    });

    const newEnemy = { key: this.state.enemyIndex, dir: side, color: type.color, speed: type.speed };
    const { maxDim, player } = this.state.size;

    switch(side) {
      case UP:
        newEnemy.top = maxDim;
        newEnemy.left = position.left;
        break;
      case DOWN:
        newEnemy.top = 0 - player;
        newEnemy.left = position.left;
        break;
      case LEFT:
        newEnemy.top = position.top;
        newEnemy.left = maxDim;
        break;
      case RIGHT:
        newEnemy.top = position.top;
        newEnemy.left = 0 - player;
        break;
    }

    return newEnemy;
  }

  handlePlayerMovement = (dirObj) => {
    const { top, left } = this.state.positions.player;
    const { player, maxDim } = this.state.size;

    // Check board limits
    switch (dirObj.dir) {
      case UP:
        if (top === 0) return;
        break;
      case DOWN:
        if (top === maxDim - player) return;
        break;
      case LEFT:
        if (left === 0) return;
        break;
      case RIGHT:
        if (left === maxDim - player) return;
        break;
    }

    // Update game state
    this.setState({
      positions: {
        ...this.state.positions,
        player: {
          top: top + (player * dirObj.top),
          left: left + (player * dirObj.left)
        }
      }
    });
  }

  handlePlayerCollision = () => {
    this.resetGame();
  }

  startGame = () => {
    this.enemyInterval = setInterval(this.updateEnemyPositions, 50);
    this.timeInterval = setInterval(this.updateGame, 1000);
    this.gameInterval = setInterval(this.updateEnemiesInPlay, 250);
  }

  updateGame = () => {
    const { timeElapsed } = this.state;

    this.updateTimeAndScore();

    // Check if player is still alive
    if (timeElapsed > 0) {
      // Increment enemy speed every 3 seconds
      if (timeElapsed % 3 === 0) this.incrementEnemySpeed();

      // Increment enemies every 10 seconds
      if (timeElapsed % 10 === 0) this.incrementActiveEnemies();
    }
  }

  updateEnemyPositions = () => {
    const { enemySpeed, positions: { enemies }, size: { player, maxDim }} = this.state;

    // Update game state
    this.setState({
      positions: {
        ...this.state.positions,
        enemies: enemies.filter(enemy => !enemy.remove).map(enemy => {
          if (enemy.top < (0 - player)
          || enemy.top > maxDim + player
          || enemy.left < (0 - player)
          || enemy.left > maxDim + player) {
            enemy.remove = true;
            return enemy;
          }

          // Calculate new speed based on inner and global speeds
          let newSpeed = enemySpeed + enemy.speed;

          // Increment the speed based on direction (top / left)
          switch(enemy.dir) {
            case UP:
              enemy.top -= newSpeed;
              break;
            case DOWN:
              enemy.top += newSpeed;
              break;
            case LEFT:
              enemy.left -= newSpeed;
              break;
            case RIGHT:
              enemy.left += newSpeed;
              break;
          }

          return enemy;
        })
      }
    });
  }

  updateEnemiesInPlay = () => {
    const { activeEnemies } = this.state;
    const { enemies } = this.state.positions;

    if (enemies.length < activeEnemies) this.placeEnemy();
  }

  updateTimeAndScore = () => {
    const { timeElapsed, playerScore, baseScore } = this.state;

    // Update game state
    this.setState({
      timeElapsed: timeElapsed + 1,
      playerScore: playerScore + baseScore,
    });
  }

  incrementEnemySpeed = () => {
    const { enemySpeed } = this.state;

    // Update game state
    this.setState({
      enemySpeed: parseFloat((enemySpeed + 0.1).toFixed(2))
    });
  }

  incrementActiveEnemies = () => {
    // Update game state
    this.setState({
      activeEnemies: this.state.activeEnemies + 1
    });
  }

  resetGame = () => {
    const { boardSize, playerSize } = this.props;
    const { playerScore } = this.state;

    clearInterval(this.gameInterval);
    clearInterval(this.enemyInterval);
    clearInterval(this.timeInterval);

    // Reset game state
    this.setState({
      ...getDefaultState({ boardSize, playerSize })
    });

    // Restart game
    this.startGame();
  }

  style = () => {
    return {
      width: '85%',
      maxWidth: '600px',
      margin: '0 auto'
    };
  }

  render() {
    const {
      size: { board, player },
      positions: { player: playerPos },
      playerScore,
      timeElapsed
    } = this.state;

    return (
      <div style={this.style()}>

        <Header />

        <GameInfo playerScore={playerScore} timeElapsed={timeElapsed} />

        <Board dimension={board * player}>
          <Player size={player} position={playerPos} handlePlayerMovement={this.handlePlayerMovement} />

          {
            this.state.positions.enemies.map(enemy =>
              <Enemy
                key={enemy.key}
                size={player}
                info={enemy}
                playerPosition={playerPos}
                color={enemy.color}
                speed={enemy.speed} 
                onCollide={this.handlePlayerCollision} />
            )
          }
        </Board>
      </div>
    )
  }

  componentDidMount() {
    this.startGame();
  }

  componentWillUnmount() {
    clearInterval(this.state.gameInterval);
    clearInterval(this.state.enemyInterval);
    clearInterval(this.state.timeInterval);
  }
}
