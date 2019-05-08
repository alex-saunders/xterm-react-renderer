import { Terminal } from 'xterm';

import Text from './Text';
import Line from './Line';

/**
 * Root is used when calling the custom `render()` method
 * (found in xterm-renderer/render/index.js)
 * As opposed to mixing the XTermRenderer in a React-DOM project
 * and using the `<Terminal>` root component
 */
class Root {
  constructor() {
    this.root = new Terminal({
      cursorBlink: true
    });

    this.position = [1, 1];

    this.children = [];
  }

  _moveToEndOfInput() {
    // 'scroll to bottom/end of input'
    const maxChild = this.children.reduce(
      (currMax, child) =>
        child.position[0] > currMax.position[0] ||
        (child.position[0] === currMax.position[0] &&
          child.position[1] >= currMax.position[1])
          ? child
          : currMax,
      {
        position: [0, 0],
        text: ''
      }
    );

    // this.position = [
    //   maxChild.position[0],
    //   maxChild.position[1] + maxChild.text.length
    // ];

    this.root.write(
      `\x1b[${maxChild.position[0]};${maxChild.position[1] +
        maxChild.text.length}H`
    );
  }

  appendChild(child) {
    this.children.push(child);

    child.appendChild(child.props.children);

    this._moveToEndOfInput();
  }

  appendBefore(child, beforeChild) {
    this.position = beforeChild.position;

    this.children.push(child);

    child.appendChild(child.props.children);

    this._moveToEndOfInput();
  }

  removeChild(child) {
    this.children = this.children.filter(
      _child => _child.position !== child.position
    );

    child.removeSelf();

    this._moveToEndOfInput();
  }
}

export default Root;
