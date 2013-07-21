class GameController < ApplicationController

  TILE_ORDER = [0,3,7,12,16,17,18,15,11,6,2,1,4,8,13,14,10,5,9]
  DICE_ORDER = [5,2,6,3,8,10,9,12,11,4,8,10,9,4,5,6,3,11]
  PORT_RESOURCES = [0,5,3,0,1,2,0,0,4]

  def init
    Tile.delete_all
    tile_pool = [0,1,1,1,1,2,2,2,3,3,3,3,4,4,4,4,5,5,5]
    desert_used = 0

    0.upto(18) do |i|
      tile = Tile.new()
      tile.tile_id = TILE_ORDER[i]
      tile.resource = tile_pool.delete_at(rand(tile_pool.length))
      if tile.resource == 0
        tile.dice_number = 0
        tile.robber = true
        desert_used = desert_used + 1
      else
        tile.dice_number = DICE_ORDER[i - desert_used]
        tile.robber = false
      end
      tile.save()
    end

    Vertex.delete_all
    0.upto(53) do |i|
      vertex = Vertex.new()
      vertex.vertex_id = i
      vertex.building = 0
      vertex.team = 0
      vertex.save()
    end

    Edge.delete_all
    0.upto(71) do |i|
      edge = Edge.new()
      edge.edge_id = i
      edge.road = false
      edge.team = 0
      edge.save()
    end

    Port.delete_all
    0.upto(8) do |i|
      port = Port.new()
      port.port_id = i
      port.resource = PORT_RESOURCES[i]
      port.save()
    end

    Player.delete_all
    0.upto(3) do |i|
      player = Player.new()
      player.team = i
      player.wood = 0
      player.brick = 0
      player.wheat = 0
      player.wool = 0
      player.ore = 0
      player.passcode = generate_activation_code
      player.save()
    end

    associate_tiles_and_vertices
    associate_edges_and_vertices
    associate_ports_and_vertices

    render text: 'initialised'
  end

  def set_cookie
    player = Player.find_by_passcode(params[:passcode])
    if !player.nil?
      cookies[:passcode] = { :value => player.passcode, :expires => 7.days.from_now }
      render :text => 'cookie set'
    else
      render :text => 'invalid passcode'
    end
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

  def ports
    ports = Port.all.sort_by {|port| port.port_id}
    array = []
    ports.each do |port|
      hash = port.attributes
      hash.delete('id')
      hash.delete('created_at')
      hash.delete('updated_at')
      hash['start_vertex'] = port.vertices[0].vertex_id
      hash['end_vertex'] = port.vertices[1].vertex_id
      array << hash
    end
    render :json => array
  end

  def player
    player = authenticate(cookies[:passcode])
    if player.nil?
      render :text => 'Unknown Player'
    else
      render :json => player, :except => [:id, :created_at, :updated_at]
    end
  end

  def players
    players = Player.all.sort_by {|player| player.team}
    array = []
    if params[:password] == 'test'
      players.each do |player|
        hash = player.attributes
        hash.delete('id')
        hash.delete('created_at')
        hash.delete('updated_at')
        array << hash
      end
    else
      players.each do |player|
        hash = { 'team' => player.team, 'cards' => player.cards }
        array << hash
      end
    end

    render :json => array
  end

  def associate_tiles_and_vertices
    ActiveRecord::Base.connection.execute("TRUNCATE #{'tiles_vertices'}")

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
    ActiveRecord::Base.connection.execute("TRUNCATE #{'edges_vertices'}")

    edges = Edge.all.sort_by{|edge| edge.edge_id}
    vertices = Vertex.all.sort_by {|vertex| vertex.vertex_id}

    0.upto(5) {|i| associate_edge_and_vertices(edges[i], i, i+1, vertices)}
    6.upto(9) {|i| associate_edge_and_vertices(edges[i], 2*i-12, 2*i-4, vertices)}
    10.upto(17) {|i| associate_edge_and_vertices(edges[i], i-3, i-2, vertices)}
    18.upto(22) {|i| associate_edge_and_vertices(edges[i], 2*i-29, 2*i-19, vertices)}
    23.upto(32) {|i| associate_edge_and_vertices(edges[i], i-7, i-6, vertices)}
    33.upto(38) {|i| associate_edge_and_vertices(edges[i], 2*i-50, 2*i-39, vertices)}
    39.upto(48) {|i| associate_edge_and_vertices(edges[i], i-12, i-11, vertices)}
    49.upto(53) {|i| associate_edge_and_vertices(edges[i], 2*i-70, 2*i-60, vertices)}
    54.upto(61) {|i| associate_edge_and_vertices(edges[i], i-16, i-15, vertices)}
    62.upto(65) {|i| associate_edge_and_vertices(edges[i], 2*i-85, 2*i-77, vertices)}
    66.upto(71) {|i| associate_edge_and_vertices(edges[i], i-19, i-18, vertices)}
  end

  def associate_edge_and_vertices(edge, first_offset, second_offset, vertices)
    edge.vertices << vertices[first_offset]
    edge.vertices << vertices[second_offset]
  end

  def associate_ports_and_vertices
    ActiveRecord::Base.connection.execute("TRUNCATE #{'ports_vertices'}")

    ports = Port.all.sort_by{|port| port.port_id}
    vertices = Vertex.all.sort_by {|vertex| vertex.vertex_id}

    ports[0].vertices << vertices[0]
    ports[0].vertices << vertices[1]
    ports[1].vertices << vertices[17]
    ports[1].vertices << vertices[7]
    ports[2].vertices << vertices[38]
    ports[2].vertices << vertices[28]
    ports[3].vertices << vertices[48]
    ports[3].vertices << vertices[47]
    ports[4].vertices << vertices[51]
    ports[4].vertices << vertices[50]
    ports[5].vertices << vertices[46]
    ports[5].vertices << vertices[45]
    ports[6].vertices << vertices[26]
    ports[6].vertices << vertices[37]
    ports[7].vertices << vertices[14]
    ports[7].vertices << vertices[15]
    ports[8].vertices << vertices[3]
    ports[8].vertices << vertices[4]
  end

  def generate_activation_code(size = 6)
    charset = %w{ 2 3 4 6 7 9 A C D E F G H J K M N P Q R T V W X Y Z}
    (0...size).map{ charset.sample }.join
  end

  # Params
  # :team     => Int,  Team number
  # :building => Int,  Building type, see BuildingEnum for valid values
  # :early    => Bool, Is this the early game setup? If so, we relax some restrictions on settlement placement
  def valid_build_locations
    
    team = Integer(params[:team])
    building = Integer(params[:building])
    early = params[:early] == '1'
    
    case building
    when BuildingEnums::SETTLEMENT
      valid = Vertex.all.select {|vertex| settlement_build_is_valid?(vertex, team, early)}.map {|v| v.vertex_id}
    when BuildingEnums::CITY
      valid = Vertex.all.select {|vertex| city_build_is_valid?(vertex, team)}.map {|v| v.vertex_id}
    when BuildingEnums::ROAD
      valid = Edge.all.select {|edge| road_build_is_valid?(edge, team)}.map {|e| e.edge_id}
    else
      valid = []
    end
    render :json => valid
  end

  def settlement_build_is_valid?(vertex, team, early = false)
    puts (early || vertex.edges.any? {|edge| edge.team == team && edge.road})
    puts (vertex.neighbours.all? {|n| n.building == BuildingEnums::EMPTY})
    puts (vertex.building == BuildingEnums::EMPTY)
    (early || vertex.edges.any? {|edge| edge.team == team && edge.road}) &&
    (vertex.neighbours.all? {|n| n.building == BuildingEnums::EMPTY}) &&
    (vertex.building == BuildingEnums::EMPTY)
  end

  def city_build_is_valid?(vertex, team)
    (vertex.building == BuildingEnums::SETTLEMENT) &&
    (vertex.team == team)
  end

  def road_build_is_valid?(edge, team)
    !edge.road &&
    edge.vertices.any? do |vertex|
       (vertex.building != BuildingEnums::EMPTY && vertex.team == team) ||
       vertex.edges.any? {|nedge| nedge.road && nedge.team == team}
    end
  end

  def player_has_resources?(player, wood = 0, brick = 0, wheat = 0, wool = 0, ore = 0)
    (player.wood >= wood) &&
    (player.brick >= brick) &&
    (player.wheat >= wheat) &&
    (player.wool >= wool) &&
    (player.ore >= ore)
  end

  def authenticate(passcode)
    Player.find_by_passcode(passcode)
  end

  def build_settlement
    is_player_turn = true #check whether it is the player's turn qq
    early = true #check if it is early build phase qq
    player = authenticate(cookies[:passcode])
    vertex = Vertex.find_by_vertex_id(params[:vertex_id])
    if settlement_build_is_valid?(vertex, player.team, early) &&
        player_has_resources?(player, 1, 1, 1, 1, 0) &&
        is_player_turn
      vertex.building = BuildingEnums::SETTLEMENT
      vertex.team = player.team
      vertex.save()
      player.wood -= 1
      player.brick -= 1
      player.wheat -= 1
      player.wool -= 1
      player.save()
      render :text => 'built'
    else
      render :text => 'invalid'
    end
  end

  def build_city
    is_player_turn = true #check whether it is the player's turn qq
    player = authenticate(cookies[:passcode])
    vertex = Vertex.find_by_vertex_id(params[:vertex_id])
    if city_build_is_valid?(vertex, player.team) &&
        player_has_resources?(player, 0, 0, 3, 0, 2) &&
        is_player_turn
      vertex.building = BuildingEnums::CITY
      vertex.team = player.team
      vertex.save()
      player.wheat -= 3
      player.ore -= 2
      player.save()
      render :text => 'built'
    else
      render :text => 'invalid'
    end
  end

  def build_road
    is_player_turn = true #check whether it is the player's turn qq
    player = authenticate(cookies[:passcode])
    edge = Edge.find_by_edge_id(params[:edge_id])
    if road_build_is_valid?(edge, player.team) &&
        player_has_resources?(player, 1, 1, 0, 0, 0) &&
        is_player_turn
      edge.road = true
      edge.team = player.team
      edge.save()
      player.wood -= 1
      player.brick -= 1
      player.save()
      render :text => 'built'
    else
      render :text => 'invalid'
    end
  end
end
