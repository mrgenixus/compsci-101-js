Rails.application.configure do
    config.secret_key_base = ENV["SECRET_KEY_BASE"]
end
