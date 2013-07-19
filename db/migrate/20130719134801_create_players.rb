class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.integer :player_id
      t.integer :wood
      t.integer :brick
      t.integer :wheat
      t.integer :wool
      t.integer :ore
      t.string :passcode, limit: 6

      t.timestamps
    end
  end
end
