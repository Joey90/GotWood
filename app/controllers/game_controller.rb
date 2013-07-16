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

    Edge.delete_all
    0.upto(71) do |i|
      edge = Edge.new()
      edge.edge_id = i
      edge.road = false
      edge.team = rand(5)
      edge.save()
    end

    associate_tiles_and_vertices()
    associate_edges_and_vertices()

    render text: 'initialised'
  end

  def tiles
    render :json => Tile.all.sort_by {|tile| tile.tile_id}, :except => [:id, :tile_id, :created_at, :updated_at]
  end

  def vertices
    render :json => Vertex.all.sort_by {|vertex| vertex.vertex_id}, :except => [:id, :vertex_id, :created_at, :updated_at]
  end

  def edges
    render :json => Edge.all.sort_by {|edge| edge.edge_id}, :except => [:id, :edge_id, :created_at, :updated_at]
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

  def associate_tile_and_vertices(tile, top_offset, bottom_offset, vertices)
    tile.vertices << vertices[top_offset]
    tile.vertices << vertices[top_offset+1]
    tile.vertices << vertices[top_offset+2]
    tile.vertices << vertices[bottom_offset]
    tile.vertices << vertices[bottom_offset+1]
    tile.vertices << vertices[bottom_offset+2]
  end

  def associate_edges_and_vertices
    edges = Edge.all.sort_by{|edge| edge.edge_id}
    vertices = Vertex.all.sort_by {|vertex| vertex.vertex_id}

    0.upto(5) {|i| associate_edge_and_vertices(edges[i], i, i+1, vertices)}
    6.upto(9) {|i| associate_edge_and_vertices(edges[i], 2*i-12, 2*i-4, vertices)}
    10.upto(17) {|i| associate_edge_and_vertices(edges[i], i-3, i-2, vertices)}
    18.upto(22) {|i| associate_edge_and_vertices(edges[i], 2*i-29, 2*i-19, vertices)}
    23.upto(32) {|i| associate_edge_and_vertices(edges[i], i-7, i-6, vertices)}
    33.upto(38) {|i| associate_edge_and_vertices(edges[i], 2*i-50, 2*i-38, vertices)}
    39.upto(48) {|i| associate_edge_and_vertices(edges[i], i-11, i-10, vertices)}
    49.upto(53) {|i| associate_edge_and_vertices(edges[i], 2*i-70, 2*i-60, vertices)}
    54.upto(61) {|i| associate_edge_and_vertices(edges[i], i-16, i-15, vertices)}
    62.upto(65) {|i| associate_edge_and_vertices(edges[i], 2*i-85, 2*i-77, vertices)}
    66.upto(71) {|i| associate_edge_and_vertices(edges[i], i-19, i-18, vertices)}
  end

  def associate_edge_and_vertices(edge, first_offset, second_offset, vertices)
    edge.vertices << vertices[first_offset]
    edge.vertices << vertices[second_offset]
  end
end
