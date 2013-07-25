class AddNameToPlayer < ActiveRecord::Migration
  def change
    add_column :players, :name, :string
    add_column :players, :army, :integer
    add_column :players, :largest_army, :boolean
    add_column :players, :longest_road, :boolean
  end
end
