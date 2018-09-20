import _ from 'lodash';
require('./base.js');
require('../../node_modules/bulma-accordion/dist/js/bulma-accordion.min.js');
import bulmaAccordion from '../../node_modules/bulma-accordion/dist/js/bulma-accordion.min.js'
require('../yellowstone.jpg');

if (process.env.NODE_ENV === 'development') {
  require('../template.html')
}

document.getElementById("nav-toggle").addEventListener ("click", toggleNav);
function toggleNav() {
    var nav = document.getElementById("nav-menu");
    var className = nav.getAttribute("class");
    if(className == "navbar-menu") {
        nav.className = "navbar-menu is-active";
    } else {
        nav.className = "navbar-menu";
    }
}

$(document).ready(function() { 
  var accordions = bulmaAccordion.attach();
});
