class CreatePortConnections < ActiveRecord::Migration
  def change
    create_table :port_connections do |t|

      t.timestamps
    end
  end
end
