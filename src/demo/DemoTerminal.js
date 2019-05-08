// @flow
import React, { Component, Fragment } from 'react';

import { Terminal } from '../renderer';
import '../renderer/styles/index.css';

type State = {
  text: string,
  isActive: boolean,
  shouldClear: boolean
};

class DemoTerminal extends Component<*, State> {
  state = {
    text: 'start typing something!',
    isActive: false,
    shouldClear: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isActive: true
      });
    }, 1000);

    setTimeout(() => {
      this.setState({
        shouldClear: true
      });
    }, 2000);
  }

  handleKeyDown = (key: string) => {
    this.setState(prevState => ({
      text: prevState.text + key
    }));
  };

  handleEnter = () => {
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
          {!this.state.shouldClear && (
            <Fragment>
              <line>hi</line>
              {this.state.isActive ? <text>ACTIVE</text> : null}
              <text>hi again</text>
            </Fragment>
          )}
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
