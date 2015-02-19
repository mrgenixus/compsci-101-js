class MessagesController < ApplicationController
  def create
    Pusher.url = "http://012feed226050a90a1a9:bec69fdbb434aa35ba0e@api.pusherapp.com/apps/107687"
    Pusher['test_channel'].trigger('my_event', message_params)
    render json: { status: "sent" }
  end

  private

  def message_params
    params.require(:message).permit(:author, :body, :image)
  end
end

