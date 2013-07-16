class TilesVerticesManyToMany < ActiveRecord::Migration
  def change
    create_table :tiles_vertices, id: false do |t|
      t.integer :tile_id
      t.integer :vertex_id
    end
  end
end
