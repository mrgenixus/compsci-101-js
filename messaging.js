(function(dsl_export) {
  var rendering_callback;
  var live = false;
  var pusher;
  var Deferred = jquery.Deferred || function() {};

  function Message(author, avatar_field, body) {
    this.dfd = this.extractImage(avatar_field);
    this.author = author;
    this.body = body;
  }

  Message.prototype.extractImage = function(file_field) {
    var dfd = Deferred();

    if (file_field.files.length) {
      var file = file_field.files[0];
      var file_reader = new FileReader();
      var _this = this;

      file_reader.onload = function(e) {
        _this.avatar_url = e.target.result;
        dfd.resolve(_this);
      };

      file_reader.getAsDataURL(file);
    } else {
      dfd.resolve(this);
    }

    return dfd.promise();
  };

  Message.prototype.done = function() {
    this.dfd.done.apply(this.dfd, arguments);
  };

  Message.prototype.fail = function() {
    this.dfd.fail.apply(this.dfd, arguments);
  };

  Message.prototype.then = function() {
    this.dfd.then.apply(this.dfd, arguments);
  };

  Message.prototype.always = function() {
    this.dfd.always.apply(this.dfd, arguments);
  };

  function render(message){
    rendering_callback(message);
  }

  function handle_new_message_event(message) {
    render(message);
  }

  function create_message(message) {
    if(live) {
      pusher.trigger('message', 'message', message);
    }

    handle_new_message_event(message);
  }

  (function() {
    function render(callback) {
      rendering_callback = callback;
    }

    function new_message(author, avatar_field, body) {
      var message = new Message(author, avatar_field, body);
      create_message(message);
    }

    function goLive() {
      //initialize pusher
      //set live to ttrue
    }
    dsl_export({ render: render, new_message: new_message, goLive: goLive });
  })();
})(function (a) { for (var b in a) { if (! a.hasOwnProperty(b)) { continue; } window[b] = a[b]; }});
