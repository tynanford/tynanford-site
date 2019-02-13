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

$('#name-input').bind('input propertychange', function() {
  var Namere = /[A-Za-z]{1}[A-Za-z]/;
  if (!Namere.test($("#name-input").val())) {
      $('#name-input').addClass("is-danger");
      $('#namehelp').addClass("is-danger").text('Name must be at least 2 characters');
  }
  else {
      $('#name-input').removeClass("is-danger");
      $('#namehelp').removeClass("is-danger").text('');

  }
});

$('#email-input').bind('input propertychange', function() {
  var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
  if (!reeamil.test($("#email-input").val())) {
      $('#email-input').addClass("is-danger");
      $('#emailhelp').addClass("is-danger").text('Please enter valid email address');
      return;
  }
  else {
      $('#email-input').removeClass("is-danger");
      $('#emailhelp').removeClass("is-danger").text('');
  }
});

$('#cancel').click(function(e) {
  e.preventDefault()
  $('#name-input').removeClass("is-danger").val('');
  $('#namehelp').removeClass("is-danger").text('');
  $('#email-input').removeClass("is-danger").val('');
  $('#emailhelp').removeClass("is-danger").text('');
  $('#message-input').removeClass("is-danger").val('');
  $('#messagehelp').removeClass("is-danger").text('');
  toast.innerHTML = '';
});

form.addEventListener('submit', function (e) {
  e.preventDefault()
  var err = false;

  var Namere = /[A-Za-z]{1}[A-Za-z]/;
  if ($("#name-input").val()=="") {
      $('#name-input').addClass("is-danger");
      $('#namehelp').addClass("is-danger").text('Please enter your name');
    err = true;
  }
  if (!Namere.test($("#name-input").val())) {
      err = true;
  }
  if ($("#email-input").val()=="") {
      $('#email-input').addClass("is-danger");
      $('#emailhelp').addClass("is-danger").text('Please enter your email address');
    err = true;
  }

  var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
  if (!reeamil.test($("#email-input").val())) {
    err = true;
  }

  if ($("#message-input").val()=="") {
      $('#message-input').addClass("is-danger");
      $('#messagehelp').addClass("is-danger").text('Please enter your message');
    err = true;
  }
  else {
      $('#message-input').removeClass("is-danger");
      $('#messagehelp').removeClass("is-danger").text('');
  }

  if(err == true) {
    toast.innerHTML = 'Message not sent. Please correct the errors.'
    return;
  }

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

