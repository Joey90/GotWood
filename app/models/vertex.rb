class Vertex < ActiveRecord::Base
  attr_accessible :building, :team, :vertex_id
  validates :building, :numericality => { :greater_than_or_equal_to => 0, :less_than_or_equal_to => 2 }
  validates :team, :numericality => { :greater_than_or_equal_to => 0, :less_than_or_equal_to => 4 }
  validates :vertex_id, :numericality => { :greater_than_or_equal_to => 0, :less_than_or_equal_to => 53 }

  has_and_belongs_to_many :tiles
  has_and_belongs_to_many :edges
  has_and_belongs_to_many :ports
  
  before_destroy { destroy_associations }

  def destroy_associations
    self.tiles.clear
    self.edges.clear
    self.ports.clear
  end
  
  def neighbours
    self.edges.flat_map {|edge| edge.vertices.find {|vertex| vertex != self}}
  end
end
