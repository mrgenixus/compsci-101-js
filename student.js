validate('first_name', function(value) {
  if (this.is_empty(value)) {
    return "cannot be empty";
  }

  if (value !== 'Ben') {
    return "must be Ben";
  }

  return true;
})
