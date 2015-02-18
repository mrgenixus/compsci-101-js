# Intent

# Assignment

# DSL
## Posting a message
```
  new_message(author, avatar_field, message);
```

## Rendering a message
```
  render(function(message) {
    $message = $('<div class="message">').html([
      $('<div class="author">').html(message.author),
      $('<img>').attr('src', message.avatar_url),
      $('<div class="body">').html(message.body)
    ]);
    $messages.append($message);
  });
```

## Live (what it does is a secret);
```
  goLive();
```
