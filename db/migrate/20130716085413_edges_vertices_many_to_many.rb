class EdgesVerticesManyToMany < ActiveRecord::Migration
  def change
    create_table :edges_vertices, id: false do |t|
      t.integer :edge_id
      t.integer :vertex_id
    end
  end
end
