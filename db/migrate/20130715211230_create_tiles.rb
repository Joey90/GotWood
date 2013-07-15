class CreateTiles < ActiveRecord::Migration
  def change
    create_table :tiles do |t|
      t.integer :tile_id
      t.integer :resource
      t.integer :dice_number
      t.boolean :robber

      t.timestamps
    end
  end
end
