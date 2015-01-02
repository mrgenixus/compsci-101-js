(function(){
  var ERROR_ELEMENT_CLASS = 'error';
  var PHONE_NUMBER = /^(\+\d+-)?\d{3}-\d{3}-\d{4}$/;
  var EMAIL = /^[a-z][a-z\+-_\.]*@[a-z][a-z\+-_\.]+\.[a-z]{2,10}$/i

  var tools = {
    is_empty: function(value) {
      return ! value;
    },

    is_ben: function(value) {
      return value === 'Ben'
    },

    is_phone_number: function(valuve) {
      return PHONE_NUMBER.test(value);
    },

    is_email: function(value) {
      return EMAIL.test(value);
    }
  };

  var validations = {};

  function bind(func, context) {
    return function bound_func() {
      return func.apply(context, arguments);
    }
  }

  function invalid_by(validations) {
    return function invalid(form_element) {
      if (validations[form_element.name]) {
        var name = form_element.name,
          value = form_element.value;
        return validations[name].call(tools, value);
      }

      return true;
    }
  }

  function prepend(node, el) { node.insertBefore(el, node.firstChild); }

  function capitalize(str) { return str[0].toUpperCase() + str.slice(1); }
  function humanize(str) { return str.toString().split('_').join(' '); }

  function remove_elements(parent_element, selector) {
    var error_element,
      error_elements = parent_element.querySelectorAll(selector);

    if(error_elements) {
      for(j = 0; j < error_elements.length; j++) {
        error_element = error_elements[j]
        parent_element.removeChild(error_element);
      }
    }
  }

  function error_element(message) {
    var element = document.createElement("div");
    element.className = ERROR_ELEMENT_CLASS;
    element.innerText = message;

    return element;
  }

  function defer(callback, args) {
    setTimeout(function deferred_function() {
      callback.apply(null, args);
    }, 1)
  }

  function run_validations(form) {
    var validation, i, j, element, parent_element, field, message,
      invalidate = invalid_by(validations),
      valid = true;

    for (i = 0; i < form.elements.length; i++) {
      element = form.elements[i];
      validation = invalidate(element);

      parent_element = element.parentElement;
      remove_elements(parent_element, '.' + ERROR_ELEMENT_CLASS);

      if(validation !== true) {
        valid = false;

        field = capitalize(humanize(element.name));
        message = [field, validation.toString()].join(' ');

        defer(prepend, [parent_element, error_element(message)]);
      }
    }

    if(validations['form']) {
      validation = validations['form'].call(tools, form.elements);
      if (validation !== true) {
        valid = false;

        message = 'Form Invalid: ' + validation.toString();
        defer(prepend, [form, error_element(message)]);
      }
    }
    return valid;
  }

  function validate_form(form) {
    return function validate_form() {
      return run_validations(form);
    }
  }

  var forms_length = 0;
  var forms  = document.forms;
  function setSubmitCallback() {

    function formsNotLoaded() { return forms.length == forms_length; }
    function wait() {}
    function thenInitializeFormHandlers() {
      forms_length = forms.length;
      setSubmitCallback()
      for (var i = 0; i < forms.length; i++) {
        forms[i].onsubmit = validate_form(forms[i]);
      }
    }

    whileAsync(formsNotLoaded, wait, thenInitializeFormHandlers);
  }

  function whileAsync(conditionCallback, bodyCallback, afterCallback) {
    function defer() {
      if(conditionCallback()) {
        bodyCallback();
        setTimeout(defer, 100);
      } else {
        afterCallback();
      }
    }

    defer();
  }

  function validate(name, callback) {
    validations[name] = callback;
  }

  window.validate = validate;
  setSubmitCallback();
})();
