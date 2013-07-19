class PortsVerticesManyToMany < ActiveRecord::Migration
  def change
    create_table :ports_vertices, id: false do |t|
      t.integer :port_id
      t.integer :vertex_id
    end
  end
end
