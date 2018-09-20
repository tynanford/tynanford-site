import _ from 'lodash';
require('./base.js');
require('./bulma-accordion.js');
import bulmaAccordion from './bulma-accordion.js'
require('../yellowstone.jpg');


$(document).ready(function() { 
  var accordions = bulmaAccordion.attach();
});
