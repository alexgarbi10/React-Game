import React, { Component, PropTypes } from 'react';
import { Square } from 'components';

class Enemy extends Component {
  componentDidUpdate() {
    const { size, playerPosition, info: { top, left } } = this.props;

    // Validate if enemy collides with player
    if (playerPosition.left < (left + size)
    && playerPosition.top  < (top + size)
    && (playerPosition.left + size) > left
    && (playerPosition.top  + size) > top) {
      this.props.onCollide();
    }
  }

  render() {
    const { size, info: { top, left }, color, speed} = this.props;
    return (
      // <Square size={size} position={{ top, left }} color='firebrick' />
      <Square size={size} position={{ top, left }} color={color} speed={speed} />
    );
  }
}

Enemy.propTypes = {
  size: PropTypes.number.isRequired,
  info: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    dir: PropTypes.string.isRequired
  }),
  playerPosition: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }),
  color: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
  onCollide: PropTypes.func.isRequired
};

export default Enemy;
