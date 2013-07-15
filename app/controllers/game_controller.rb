class GameController < ApplicationController

  def init
    Tile.delete_all
    for i in 0..18
      tile = Tile.new()
      tile.tile_id = i
      tile.resource = 1 + rand(5)
      tile.dice_number = 1 + rand(12)
      tile.robber = false
      tile.save()
    end
    render text: "initialised"
  end

  def tiles
    render :json => Tile.all.sort_by {|tile| tile.tile_id}, :except => [:id, :tile_id, :created_at, :updated_at]
  end
end
