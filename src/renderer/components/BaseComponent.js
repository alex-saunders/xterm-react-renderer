/* eslint-disable no-console */

/**
 *
 * BaseComponent is a base parent class that all other components (except Root & Terminal)
 * inherit from. It contains several methods that must be implemented:
 *
 * - `appendChild(child)`
 *    render the new child, update sibling positions & update the root terminal
 *    `position` value to reflect the appended child
 *
 * - `replaceChild(child)`
 *    replace the current child (usually text) with the new `child` value,
 *    usually involves removing the characters of the old text + writing the new
 *    ones, updating sibling positions in the process.
 *
 * - `updatePosition(deltaRow, deltaCol)`
 *    render the output of this component in old position + delta.
 *    Must also remove the old output
 *
 * - `removeSelf()`
 *    remove the output of this component (usually involves removing
 *    the characters that this component renders from the terminal output)
 *
 */
class BaseComponent {
  constructor(root, props) {
    this.root = root;
    this.props = props;

    this.terminal = this.root.root;

    this.position = [this.root.position[0], this.root.position[1]];
  }

  goToPosition(row = this.position[0], col = this.position[1]) {
    this.terminal.write(`\x1b[${row};${col}H`);
  }

  replaceChild(_text) {
    console.error('replaceChild not implemented!');
  }

  appendChild(_text) {
    console.error('appendChild not implemented!');
  }

  updatePosition(_deltaRow, _deltaCol) {
    console.error('updatePosition not implemented!', this);
  }

  removeSelf() {
    console.error('removeSelf not implemented!');
  }
}

export default BaseComponent;
