class GameController < ApplicationController

  def init
    Tile.delete_all
    0.upto(18) do |i|
      tile = Tile.new()
      tile.tile_id = i
      tile.resource = 1 + rand(5)
      tile.dice_number = 2 + rand(11)
      tile.robber = false
      tile.save()
    end

    Vertex.delete_all
    0.upto(53) do |i|
      vertex = Vertex.new()
      vertex.vertex_id = i
      vertex.building = rand(3)
      vertex.team = rand(5)
      vertex.save()
    end

    associate_tiles_and_vertices()

    render text: 'initialised'
  end

  def tiles
    render :json => Tile.all.sort_by {|tile| tile.tile_id}, :except => [:id, :tile_id, :created_at, :updated_at]
  end

  def vertices
    render :json => Vertex.all.sort_by {|vertex| vertex.vertex_id}, :except => [:id, :vertex_id, :created_at, :updated_at]
  end

  def associate_tiles_and_vertices
    tiles = Tile.all.sort_by {|tile| tile.tile_id}
    vertices = Vertex.all.sort_by {|vertex| vertex.vertex_id}

    0.upto(2) {|i| associate_tile_and_vertices(tiles[i], 2*i+0, 2*i+0, vertices)}
    3.upto(6) {|i| associate_tile_and_vertices(tiles[i], 2*i+1, 2*i+3, vertices)}
    7.upto(11) {|i| associate_tile_and_vertices(tiles[i], 2*i+2, 2*i+13, vertices)}
    12.upto(15) {|i| associate_tile_and_vertices(tiles[i], 2*i+3, 2*i+14, vertices)}
    16.upto(18) {|i| associate_tile_and_vertices(tiles[i], 2*i+7, 2*i+15, vertices)}
  end

  def associate_tile_and_vertices(tile, offset1, offset2, vertices)
    tile.vertices << vertices[offset1]
    tile.vertices << vertices[offset1+1]
    tile.vertices << vertices[offset1+2]
    tile.vertices << vertices[offset2]
    tile.vertices << vertices[offset2+1]
    tile.vertices << vertices[offset2+2]
  end
end
