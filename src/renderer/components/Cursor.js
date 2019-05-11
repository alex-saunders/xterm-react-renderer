import BaseComponent from './BaseComponent';

class Cursor extends BaseComponent {
  constructor(root, props) {
    super(root, props);
  }

  appendChild(child) {
    if (child !== undefined && child !== null) {
      // eslint-disable-next-line no-console
      console.error('<cursor /> does not accept children! Received:', child);
    }

    // set this.position based off root's current position
    this.position = [this.root.position[0], this.root.position[1]];

    console.log('cursor position', this.position);
  }

  replaceChild(child) {
    if (child !== undefined && child !== null) {
      // eslint-disable-next-line no-console
      console.error('<cursor /> does not accept children! Received:', child);
    }
  }

  updatePosition(deltaRow, deltaCol) {
    this.position = [this.position[0] + deltaRow, this.position[1] + deltaCol];
    console.log('cursor position', this.position);
  }

  removeSelf() {
    /* noop */
  }
}

export default Cursor;
