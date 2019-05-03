import { Terminal } from 'xterm';

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

    this._row = 1;
    this._column = 0;

    this.children = [];
  }

  get position() {
    return [this._row, this._column];
  }

  set position(position) {
    this.position = position;
  }

  appendChild(child) {
    this.children.push(child);

    // 'scroll to bottom/end of input'
    const maxChild = this.children.reduce(
      (currMax, child) =>
        child.position[0] >= currMax.position[0] &&
        child.position[1] >= currMax.position[1]
          ? child
          : currMax,
      {
        position: [0, 0],
        text: ''
      }
    );

    this.root.write(
      `\x1b[${maxChild.position[0]};${maxChild.position[1] +
        maxChild.text.length +
        (maxChild.text ? 1 : 0)}H`
    );
  }

  removeChild(child) {
    const index = this.children.findIndex(
      _child => _child.position === child.position
    );
    this.children.splice(index, 1);
  }
}

export default Root;
