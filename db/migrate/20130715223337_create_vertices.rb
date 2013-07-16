class CreateVertices < ActiveRecord::Migration
  def change
    create_table :vertices do |t|
      t.integer :vertex_id
      t.integer :building
      t.integer :team

      t.timestamps
    end
  end
end
