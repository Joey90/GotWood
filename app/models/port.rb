class Port < ActiveRecord::Base
  attr_accessible :port_id, :resource
  validates :port_id, :numericality => { :greater_than_or_equal_to => 0, :less_than_or_equal_to => 8 }

  has_and_belongs_to_many :vertices
  before_destroy { destroy_associations }

  def destroy_associations
    self.vertices.clear
  end
end
