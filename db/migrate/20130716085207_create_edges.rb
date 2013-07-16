class CreateEdges < ActiveRecord::Migration
  def change
    create_table :edges do |t|
      t.integer :edge_id
      t.boolean :road
      t.integer :team

      t.timestamps
    end
  end
end
