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
  }

  goToPosition(row, col) {
    console.log('goToPosition', row, col);
    this.terminal.write(`\x1b[${row};${col}H`);
  }

  replaceChild(child) {
    this.goToPosition(
      this.position[0],
      this.position[1] + this.text.length + 1
    );

    this.terminal.write('\b \b'.repeat(this.text.length + 1));
    this.terminal.write(`${child}`);

    this.text = child;
  }

  appendChild(child) {
    this.terminal.write(`${child}`);

    console.log('ROOT POSITION', this.root.position);

    this.position = [this.root.position[0], this.root.position[1]];

    this.text = child;
  }

  updatePosition(deltaRow, deltaCol) {
    this.goToPosition(this.position[0], this.position[1]);

    this.terminal.write('\b \b'.repeat(this.text.length + 1));

    this.position = [this.position[0] + deltaRow, this.position[1] + deltaCol];

    this.goToPosition(this.position[0], this.position[1] - this.text.length);
    this.terminal.write(`${this.text}`);
  }

  removeSelf() {
    this.goToPosition(
      this.position[0],
      this.position[1] + this.text.length + 1
    );

    this.terminal.write('\b \b'.repeat(this.text.length));
  }
}

export default Text;
