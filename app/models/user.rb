class User
  include ActiveModel::Validations
  include ActiveModel::Conversion
  extend ActiveModel::Naming

  attr_accessor :first_name, :last_name, :phone_number, :email,
    :password, :password_confirm, :backstory, :favorite_author,
    :profession, :dream

  validates_presence_of :first_name
  validates_presence_of :last_name
  validates_presence_of :email
  validates_presence_of :password
  validates_presence_of :password_confirm

  validate :password_and_confirmation

  validates_presence_of :dream

  validates_format_of :email, :with => /[a-z][a-z\+-_\.]*@[a-z][a-z\+-_\.]+\.[a-z]{2,10}/i
  validates format: { :phone_number, :with => /(\+\d+-)?\d{3}-\d{3}-\d{4}/ }, :allow_blank => true


  def initialize(attributes = {})
    attributes.each do |name, value|
      send("#{name}=", value)
    end
  end

  def persisted?
    false
  end

  private

  def password_and_confirmation
    unless password == password_confirm
      errors[:password_confirm] = "must match password"
    end
  end
end
