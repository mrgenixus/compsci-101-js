class Student < ActiveRecord::Base
  validates :name, presence: :true, format: /\w+(\ \w+)+/
  validates :hair_color, inclusion: { in: %w(blonde red bunette black grey gray brown) } 

  def first_name
    name && name.split(/\ /).first || ''
  end

  def last_name
    name && name.split(/\ /).last || ''
  end

  def middle_name
    name && name.split(/\ /)[1...-1].join(' ') || ''
  end

end