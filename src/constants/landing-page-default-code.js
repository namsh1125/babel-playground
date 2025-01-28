export const MODERN_CODE = `// Modern JavaScript
const greeting = (name) => {
  return \`Hello, \${name}!\`;
};

class Person {
  constructor(name) {
    this.name = name;
  }
}

const numbers = [...[1, 2, 3]];`;

export const TRANSFORMED_CODE = `// Transformed Code
"use strict";

var greeting = function greeting(name) {
  return "Hello, " + name + "!";
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Person = function Person(name) {
  _classCallCheck(this, Person);
  this.name = name;
};

var numbers = [].concat([1, 2, 3]);`;
