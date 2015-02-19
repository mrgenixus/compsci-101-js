class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  before_filter :allow_cors

  def allow_cors
     headers["Access-Control-Allow-Origin"] = "*"
     headers["Access-Control-Allow-Methods"] = %w{GET POST PUT DELETE}.join(",")
     headers["Access-Control-Allow-Headers"] =
       %w{Origin Accept Content-Type X-Requested-With X-CSRF-Token}.join(",")

     render text: '' if request.request_method == "OPTIONS"
   end
end
