require('./base.js');
require('./nav.js');
require('./contact.js');
require('../../node_modules/bulma-accordion/dist/js/bulma-accordion.min.js');
import bulmaAccordion from '../../node_modules/bulma-accordion/dist/js/bulma-accordion.min.js'

if (process.env.NODE_ENV === 'development') {
  require('../views/index.pug')
  require('../views/layout.pug')
  require('../views/includes/head.pug')
  require('../views/includes/nav.pug')
  require('../views/includes/hero.pug')
  require('../views/includes/about.pug')
  require('../views/includes/skills.pug')
  require('../views/includes/experience.pug')
  require('../views/includes/school.pug')
  require('../views/includes/adventure.pug')
  require('../views/includes/contact.pug')
  require('../views/includes/footer.pug')
}


$(document).ready(function() { 
  var accordions = bulmaAccordion.attach();
});


