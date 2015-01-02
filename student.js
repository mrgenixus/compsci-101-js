validate('first_name', function(value) {
  if (this.is_empty(value)) {
    return "cannot be empty";
  }

  if (value !== 'Ben') {
    return "must be Ben";
  }

  return true;
})

validate('form', function(elements) {
  if (elements['first_name'].value == elements['last_name'].value) {
    return "First Name and Last Name cannot be the same";
  }

  return true;
})
