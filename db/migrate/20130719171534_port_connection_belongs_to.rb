class PortConnectionBelongsTo < ActiveRecord::Migration
  def change
    change_table :port_connections do |t|
      t.belongs_to :vertex
      t.belongs_to :port
    end
  end
end