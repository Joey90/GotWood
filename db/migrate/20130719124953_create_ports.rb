class CreatePorts < ActiveRecord::Migration
  def change
    create_table :ports do |t|
      t.integer :port_id
      t.integer :resource

      t.timestamps
    end
  end
end
