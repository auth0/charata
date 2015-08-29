import assert from 'assert';
import charata from '../lib';

let { el, ul, li } = charata;

describe('charata', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render elements with text', () => {
    el('div', 'hello world' , null, ['class', 'test']).renderTo(document.body);

    let myEl = document.getElementsByClassName('test')[0];

    assert.ok(myEl.textContent === 'hello world');
  });
  
  it('should render elements with children', () => {
    ul([
      li('one')
    ]).renderTo(document.body);

    let myUL = document.getElementsByTagName('ul');
    let myLI = document.getElementsByTagName('li');

    assert.ok(myUL.length === 1);
    assert.ok(myLI.length === 1);
  });

  it('should render elements with collections as children', () => {
    el('ul', [
      el('li', 'one'),
      el('li', 'two'),
      el('li', 'three')
    ]).renderTo(document.body);
    
    let myUl = document.getElementsByTagName('ul');
    let myLIs = document.getElementsByTagName('li');

    assert.ok(myUl.length === 1);
    assert.ok(myLIs.length === 3);
  });
});
