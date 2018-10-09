require('./base.js');
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
  require('../views/includes/adventure.pug')
  require('../views/includes/contact.pug')
  require('../views/includes/footer.pug')
}

function turnOffNav() {
    var nav = document.getElementById("nav-menu");
    nav.className = "navbar-menu";
}

$(document).ready(function(){
  $("a").on('click', function(event) {

    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top,
        complete: turnOffNav()
      },'slow'); 
    } 
  });
});
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


const form = document.getElementById('contactForm')
const url = 'https://ru8gdpeu7l.execute-api.us-east-1.amazonaws.com/dev/email/send'
const toast = document.getElementById('toast')
const submit = document.getElementById('submit')

function post(url, body, callback) {
  var req = new XMLHttpRequest();
  req.open("POST", url, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.addEventListener("load", function () {
    if (req.status < 400) {
      callback(null, JSON.parse(req.responseText));
    } else {
      callback(new Error("Request failed: " + req.statusText));
    }
  });
  req.send(JSON.stringify(body));
}
function success () {
  toast.innerHTML = 'Thanks for sending me a message! I\'ll get in touch with you soon. :)'
  submit.disabled = false
  submit.blur()
  form.name.focus()
  form.name.value = ''
  form.email.value = ''
  form.content.value = ''
}
function error (err) {
  toast.innerHTML = 'There was an error with sending your message, hold up until I fix it. Thanks for waiting.'
  submit.disabled = false
  console.log(err)
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  toast.innerHTML = 'Sending'
  submit.disabled = true

  const payload = {
    name: form.name.value,
    email: form.email.value,
    content: form.content.value
  }
  post(url, payload, function (err, res) {
    if (err) { return error(err) }
    success()
  })
})
