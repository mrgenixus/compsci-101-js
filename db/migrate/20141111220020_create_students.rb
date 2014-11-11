class CreateStudents < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.string :name
      t.string :age
      t.string :school
      t.string :hair_color
      t.string :email
    end
  end
end
