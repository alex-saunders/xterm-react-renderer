// @flow
import React, { Component } from 'react';

import { Terminal } from '../renderer';
import '../renderer/styles/index.css';

type State = {
  text: string,
  isActive: boolean
};

class DemoTerminal extends Component<*, State> {
  state = {
    text: 'start typing something!',
    isActive: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isActive: true
      });
    }, 1000);
  }

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

    return (
      <div className="terminal-container">
        <Terminal
          onEnter={this.handleEnter}
          onKeyDown={this.handleKeyDown}
          onBackspace={this.handleBackspace}
        >
          <text>hi</text>
          {this.state.isActive ? <text>ACTIVE</text> : null}
          <text>hi again</text>
          {lines.map((line, index) =>
            index + 1 >= lines.length ? (
              <text key={`${line}-${index}`}>{line}</text>
            ) : (
              <line key={`${line}-${index}`}>{line}</line>
            )
          )}
        </Terminal>
      </div>
    );
  }
}

export default DemoTerminal;
