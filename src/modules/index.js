import _ from 'lodash';
require('./base.js');
if (process.env.NODE_ENV !== 'production') {
  console.log('Dev mode');
}

function component() {
  let element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  return element;
}

document.body.appendChild(component());

