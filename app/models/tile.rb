class Tile < ActiveRecord::Base
  attr_accessible :dice_number, :resource, :robber, :tile_id
  validates :dice_number, :numericality => { :greater_than_or_equal_to => 2, :less_than_or_equal_to => 12 }
  validates :resource, :numericality => { :greater_than_or_equal_to => 0, :less_than_or_equal_to => 5 }
  validates :tile_id, :numericality => { :greater_than_or_equal_to => 0, :less_than_or_equal_to => 18 }

  has_and_belongs_to_many :vertices
  before_destroy :destroy_associations

  def destroy_associations
    self.vertices.clear
  end
end
