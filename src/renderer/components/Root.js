import { Terminal } from 'xterm';

import Cursor from './Cursor';

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

  _moveToCursorOrEndOfInput() {
    // first, try and find any <cursor /> components
    const cursorChildren = this.children.filter(
      child => child instanceof Cursor
    );

    // if there are more than one, error out
    if (cursorChildren.length > 1) {
      // eslint-disable-next-line
      console.error('multiple <cursor /> components are not allowed!');
    }

    // if there is 1 cursor
    if (cursorChildren.length === 1) {
      // move the xterm cursor to the cursor component's position
      const cursor = cursorChildren[0];
      return this.root.write(
        `\x1b[${cursor.position[0]};${cursor.position[1]}H`
      );
    }

    // if there are no <cursor /> components, then
    // move the xterm cursor to the bottom/end of input
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

    this.root.write(
      `\x1b[${maxChild.position[0]};${
        maxChild.position[1] + maxChild.text ? maxChild.text.length + 1 : 0
      }H`
    );
  }

  appendChild(child) {
    if (child.props.children && typeof child.props.children !== 'string') {
      console.error(
        'Nested components are not supported!',
        child.props.children
      );
      return;
    }

    this.children.push(child);

    child.appendChild(child.props.children);

    this._moveToCursorOrEndOfInput();
  }

  appendBefore(child, beforeChild) {
    this.position = beforeChild.position;

    this.children.push(child);

    child.appendChild(child.props.children);

    this._moveToCursorOrEndOfInput();
  }

  removeChild(child) {
    this.children = this.children.filter(
      _child => _child.position !== child.position
    );

    child.removeSelf();

    this._moveToCursorOrEndOfInput();
  }
}

export default Root;
