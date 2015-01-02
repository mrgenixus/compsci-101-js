class UsersController < ApplicationController
  def create
    @user = User.new create_user_params

    if @user.valid?
      render :green
    else
      render :red
    end
  end

  private

  def create_user_params
    params.permit(:first_name, :last_name, :phone_number, :email,
      :password, :password_confirm, :backstory, :favorite_author,
      :profession, :dream)
  end
end
