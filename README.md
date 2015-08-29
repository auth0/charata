# Charata [![Build Status](https://travis-ci.org/tehsis/charata.svg?branch=master)](https://travis-ci.org/tehsis/charata)

Charata allows using incremental DOM in a easier way.

## Install

```sh
npm i --save charata
```

## Usage

Charata makes use of [Google's Incremental DOM](https://github.com/google/incremental-dom) providing a simple to use
librarie to create and render custom DOM components.

it exports a function to create and append DOM elements following a hirearchaly way.

```js
  el(<tag>, [<text>|<el>|<elArray]>, <key>, <attributes>);
```

```js
  import {el} from 'charata';

  let myList = el('ul', [
    el('li', 'one'),
    el('li', 'two'),
    el('li', 'three')
  ], null, ['class', 'my-list']);

  myList.renderTo(document.body);
```

this will render into your DOM (under `document.body` in this case)

```
<ul class="my-list">
  <li>one</li>
  <li>two</li>
  <li>three</li>
</ul>
```

Your DOM is patched using Incremental DOM, that means that you can create complex components and re-rendered them with a little hit on your performance.
For a more complex example, take a look at tehsis/incremental-todo

## Extra helpers

Besides the main `el` function, you can import helpers for most common HTML elements
The previous example could be rewritten as follows:

```js
import {ul, li} from 'charata';

let myList = ul([
  li('one').
  li('two'),
  li('three')
], null, ['class', 'my-list']);

myList.renderTo(document.body);
```

## More information on Incremental DOM
  * [Incremental DOM]('https://github.com/google/incremental-dom')
  * https://medium.com/google-developers/introducing-incremental-dom-e98f79ce2c5f 
