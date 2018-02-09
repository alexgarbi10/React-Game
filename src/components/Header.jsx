import React, { Component } from 'react';

class Header extends Component {
  style = () => {
    return {
      div: {
        overflow: 'hidden',
        backgroundColor: '#117bf3',
        position: 'fixed',
        top: '15px',
        left: '0',
        zIndex: '99',
        width: '100%',
        height: '65px',
        textAlign: 'center',
        marginTop: '-20px'
      },
      title: {
        marginTop: '15px'
      }

    };
  };

  render() {
    const { div, title } = this.style();
    return (
      <div style={div}>
        <h1 style={title}>React App</h1>
      </div>
    );
  }
}

export default Header;
