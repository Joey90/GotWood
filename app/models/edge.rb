class Edge < ActiveRecord::Base
  attr_accessible :edge_id, :road, :team
  validates :team, :numericality => { :greater_than_or_equal_to => 0, :less_than_or_equal_to => 4 }
  validates :edge_id, :numericality => { :greater_than_or_equal_to => 0, :less_than_or_equal_to => 71 }

  has_and_belongs_to_many :vertices
  before_destroy { destroy_associations }

  def destroy_associations
    self.vertices.clear
  end
end
