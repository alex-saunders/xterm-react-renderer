// @flow
import React, { Component } from 'react';

import { Terminal } from '../renderer';
import '../renderer/styles/index.css';

type State = {
  text: string
};

class DemoTerminal extends Component<*, State> {
  state = {
    text: 'start typing something!'
  };

  handleKeyDown = key => {
    this.setState(prevState => ({
      text: prevState.text + key
    }));
  };

  handleEnter = () => {
    console.log('enter');
    this.setState(prevState => ({
      text: prevState.text + '\n'
    }));
  };

  handleBackspace = () => {
    this.setState(prevState => {
      return {
        text: prevState.text.substring(0, prevState.text.length - 1)
      };
    });
  };

  render() {
    const lines = this.state.text.split('\n');
    console.log('LINES', lines);
    return (
      <div className="terminal-container">
        <Terminal
          onEnter={this.handleEnter}
          onKeyDown={this.handleKeyDown}
          onBackspace={this.handleBackspace}
        >
          {lines.map((line, index) =>
            index + 1 >= lines.length ? (
              <text>{line}</text>
            ) : (
              <line>{line}</line>
            )
          )}
        </Terminal>
      </div>
    );
  }
}

export default DemoTerminal;
