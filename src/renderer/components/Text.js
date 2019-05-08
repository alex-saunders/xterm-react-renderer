/**
 * Text uses the `write` method available through XTerm to
 * write text to the terminal
 */
class Text {
  constructor(root, props) {
    this.root = root;
    this.props = props;

    this.text = this.props.children;

    this.terminal = this.root.root;

    this.position = [this.root.position[0], this.root.position[1]];
  }

  goToPosition(row = this.position[0], col = this.position[1]) {
    this.terminal.write(`\x1b[${row};${col}H`);
  }

  replaceChild(text) {
    // erase old text
    this.goToPosition(this.position[0], this.position[1] + this.text.length);
    this.terminal.write('\b \b'.repeat(this.text.length));

    // write new text
    this.terminal.write(`${text}`);

    this.text = text;
  }

  appendChild(text) {
    this.text = text;

    // set this.position based off root's current position
    this.position = [this.root.position[0], this.root.position[1]];

    // adjust sibling positions if this text is in the place of current children
    this.updateSiblingPositions(this.text.length);

    // go to this.position
    this.goToPosition();
    // write the text to the terminal
    this.terminal.write(`${text}`);

    // update root's position to account for the text length
    this.root.position = [
      this.position[0],
      this.position[1] + this.text.length
    ];
  }

  updateSiblingPositions(delta) {
    const children = this.root.children;

    const collidingChildren = children.filter(
      child =>
        child.position[0] === this.position[0] &&
        child.position[1] >= this.position[1] &&
        child !== this
    );

    // TODO: make this efficient - we reverse the array so that
    // children are not overwritten by the deletion of future iterations
    // that is required when we call updatePosition.
    for (let child of collidingChildren.reverse()) {
      child.updatePosition(0, delta);
    }
  }

  updatePosition(deltaRow, deltaCol) {
    // go to 'old' position
    this.goToPosition(this.position[0], this.position[1] + this.text.length);

    // remove current text
    this.terminal.write('\b \b'.repeat(this.text.length));

    // update position and go to it
    this.position = [this.position[0] + deltaRow, this.position[1] + deltaCol];
    this.goToPosition();

    // write text back
    this.terminal.write(`${this.text}`);
  }

  removeSelf() {
    this.goToPosition(this.position[0], this.position[1] + this.text.length);

    this.terminal.write('\b \b'.repeat(this.text.length));

    // adjust sibling positions if this text is in the place of current children
    this.updateSiblingPositions(-this.text.length);

    // update root's position to account for the text length
    this.root.position = [this.position[0], this.position[1]];
  }
}

export default Text;
