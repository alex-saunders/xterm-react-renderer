import BaseComponent from './BaseComponent';

/**
 * Br simulates the writeln method to
 * 'write' a fake carriage return
 */
class Br extends BaseComponent {
  constructor(root, props) {
    super(root, props);

    this.text = '';
  }

  appendChild(child) {
    if (child !== undefined && child !== null) {
      // eslint-disable-next-line no-console
      console.error('<Br /> does not accept children! Received:', child);
    }

    // set this.position based off root's current position
    this.position = [this.root.position[0], this.root.position[1]];

    // update root's position to account for the new line
    this.root.position = [this.position[0] + 1, 1];
  }

  updatePosition(deltaRow, deltaCol) {
    this.position = [this.position[0] + deltaRow, this.position[1] + deltaCol];
  }

  updateSiblingPositions(deltaRow) {
    // find all children 'below' this line
    const childrenToUpdate = this.root.children.filter(
      child => child !== this && child.position[0] >= this.position[0]
    );

    // move them by deltaRow rows
    childrenToUpdate.forEach(child => child.updatePosition(deltaRow, 0));
  }

  removeSelf() {
    this.updateSiblingPositions(-1);
  }
}

export default Br;
