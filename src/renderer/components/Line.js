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

  goToPosition(row, col) {
    console.log('goToPosition', row);
    this.terminal.write(`\x1b[${row};${col}H`);
  }

  replaceChild(child) {
    console.log('replaceChild', child);
    this.goToPosition(this.root.position[0], 0);
    this.position = [this.root.position[0], 0];

    this.terminal.write('\b \b'.repeat(this.text.length));
    this.terminal.writeln(`${child}`);

    this.root._row = this.root.position[0] + 1;
    this.root._column = 0;

    this.text = child;
  }

  appendChild(child) {
    this.replaceChild(child);
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
