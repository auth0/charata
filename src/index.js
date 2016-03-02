import ID from 'incremental-dom';

const TAGS = [
  'div', 'span', 'ul', 'li',
  'form', 'button', 'i',
  'a', 'h1', 'h2', 'h3',
  'h4', 'h5', 'table', 'td', 'tr',
  'tbody', 'thead', 'label', 'fieldset'
];

const SELF_CLOSING_TAGS = [
  'input',
  'img'
];

/**
 * Represents a HTML Element
 */
export class EL {
  /**
   * Creates a new element
   *
   * @param {string} tag the specific HTML TAG of the Element.
   * @param {null|String|EL|Array} content
   * @param {Array} props
   * @param {Array} dynamic props
   */
  constructor(tag, content=null, key='', props=[], dynProps=[]) {
    this.tag = tag;

    this.content = content;

    // this allows content to be a string o a single element.
    if ('string' === typeof this.content) {
      this.content = new TEXT(this.content);
    }

    if (!Array.isArray(this.content)) {
      this.content = [this.content];
    }

    this.key = key;
    this.props = props;
    this.dynProps = dynProps;
  }

  /**
   * renders this element and its children.
   */
  render() {
    if (null === this.content) {
      ID.elementVoid(this.tag, this.key, this.props, ...this.dynProps);
      return;
    }

    ID.elementOpen(this.tag, this.key, this.props, ...this.dynProps);

    this.content.forEach((c) => {
      if (!c) {
        return;
      }
      if(typeof c === 'string'){
        ID.text(c);
        return;
      }
      c.render();
    });

    ID.elementClose(this.tag);
  }

  /**
   * Render element into DOM
   *
   * @params {HTMLElement} container the container where the elements is going to be patched.
   */
  renderTo(container) {
    ID.patch(container, this.render.bind(this));
  }
}


class TEXT {
  constructor(content) {
    this.content = content;
  }

  render() {
    ID.text(this.content);
  }
}

let pub = TAGS.reduce((prev, tag) => {
  prev[tag] = (elms, key, props, dynProps) => {
    return new EL(tag, elms, key, props, dynProps);
  }

  return prev;
}, {});

SELF_CLOSING_TAGS.reduce((prev, tag) => {
  prev[tag] = (key, props, dynProps) => {
    return new EL(tag, null, key, props, dynProps);
  }

  return prev;
}, pub);

// Generic Element builder
pub.el = (tag, elms, key, props) => new EL(tag, elms, key, props);

export default pub;