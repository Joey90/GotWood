class RenamePlayerIdTeam < ActiveRecord::Migration
  def up
    rename_column :players, :player_id, :team
  end

  def down
    rename_column :players, :team, :player_id
  end
end
