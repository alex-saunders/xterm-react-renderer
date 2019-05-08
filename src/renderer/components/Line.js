import BaseComponent from './BaseComponent';

/**
 * Line uses the `writeln` method available through XTerm to
 * write text, followed by a carriage return
 */
class Line extends BaseComponent {
  constructor(root, props) {
    super(root, props);

    this.text = props.children;
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

    // go to this.position
    this.goToPosition();
    // write the text to the terminal
    this.terminal.write(`${text}`);

    this.updateSiblingPositions(1);

    // update root's position to account for the new txt
    this.root.position = [this.position[0] + 1, 1];
  }

  updatePosition(deltaRow, deltaCol) {
    this.goToPosition(
      this.position[0],
      this.position[1] + this.text.length + 1
    );

    this.terminal.write('\b \b'.repeat(this.text.length + 1));

    this.position = [this.position[0] + deltaRow, this.position[1] + deltaCol];

    this.goToPosition(this.position[0], this.position[1]);

    this.terminal.write(`${this.text}`);
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
    // remove characters
    this.goToPosition(this.position[0], this.text.length + 1);
    this.terminal.write('\b \b'.repeat(this.text.length + 1));

    this.updateSiblingPositions(-1);

    // update the `root`'s internal position
    this.root.position = [this.root.position[0] - 1, this.root.position[1]];
  }
}

export default Line;
