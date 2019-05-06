/**
 * Line uses the `writeln` method available through XTerm to
 * write text, followed by a carriage return
 */
class Line {
  constructor(root, props) {
    this.root = root;
    this.props = props;

    this.text = this.props.children;

    this.terminal = this.root.root;
  }

  goToPosition(row = this.position[0], col = this.position[1]) {
    this.terminal.write(`\x1b[${row};${col}H`);
  }

  replaceChild(text) {
    // erase old text
    this.goToPosition(this.position[0], this.position[1] + this.text.length);
    this.terminal.write('\b \b'.repeat(this.text.length));

    // write new text
    this.terminal.writeln(`${text}`);

    this.text = text;
  }

  appendChild(text) {
    this.text = text;

    // set this.position based off root's current position
    this.position = [this.root.position[0], this.root.position[1]];

    // go to this.position
    this.goToPosition();
    // write the text to the terminal
    this.terminal.writeln(`${text}`);

    // update root's position to account for the new txt
    this.root.position = [this.position[0] + 1, 1];
  }

  updatePosition(deltaRow, deltaCol) {
    this.goToPosition(this.position[0], this.text.length + 1);

    this.terminal.write('\b \b'.repeat(this.text.length + 1));

    this.position = [this.position[0] + deltaRow + 1, 0];

    this.goToPosition(this.position[0], 0);
    this.terminal.writeln(`${this.text}`);
  }

  removeSelf() {
    // remove characters
    this.goToPosition(this.position[0], this.text.length + 1);
    this.terminal.write('\b \b'.repeat(this.text.length + 1));

    // find all children 'below' this line
    const childrenToUpdate = this.root.children.filter(
      child => child.position[0] > this.position[0]
    );

    // move them up by a line to account for this line being removed
    childrenToUpdate.forEach(child => child.updatePosition(-1, 0));

    // update the `root`'s internal position
    this.root._row -= 1;
  }
}

export default Line;
