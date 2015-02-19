(function(dsl_export) {
  var rendering_callback;
  var live = false;
  var pusher, channel;
  var Deferred = jQuery.Deferred || function() {};

  function Message(author, avatar_field, body) {
    this.dfd = this.extractImage(avatar_field);
    this.author = author;
    this.body = body;
  }


  Message.prototype.extractImage = function(file_field) {
    var dfd = Deferred();

    if (file_field && file_field.files && file_field.files.length) {
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

  Message.prototype.toJSON = function() {
    return JSON.parse(JSON.stringify({
      avatar_url: this.avatar_url,
      author: this.author,
      body: this.body
    }));
  };

  function render(message){
    if (rendering_callback) {
      rendering_callback(message);
    }
  }

  function handle_new_message_event(message) {
    render(message);
  }

  function create_message(message) {
    if(live && channel && pusher) {
      //post to heroku-hosted-server
    }

    handle_new_message_event(message);
  }

  (function() {
    function render(callback) {
      rendering_callback = callback;
    }

    function new_message(author, avatar_field, body) {
      var message = new Message(author, avatar_field, body);
      message.done(function() {
        create_message(message.toJSON());
      });
    }

    function goLive() {
      pusher = new Pusher('012feed226050a90a1a9');
      channel = pusher.subscribe('presence-message');
      channel.bind('client-message', function(data) {
        handle_new_message_event(data);
      });
      live = true;
    }

    function stop() {
      live = false;
      pusher = null;
    }

    dsl_export({ render: render, new_message: new_message, goLive: goLive, stop: stop });
  })();
})(function (a) { for (var b in a) { if (! a.hasOwnProperty(b)) { continue; } window[b] = a[b]; }});
