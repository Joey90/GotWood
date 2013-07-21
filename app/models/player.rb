class Player < ActiveRecord::Base
  attr_accessible :brick, :ore, :passcode, :team, :wheat, :wood, :wool
  validates :team, :numericality => { :greater_than_or_equal_to => 0, :less_than_or_equal_to => 3 }
  validates :wood, :numericality => { :greater_than_or_equal_to => 0 }
  validates :brick, :numericality => { :greater_than_or_equal_to => 0 }
  validates :wheat, :numericality => { :greater_than_or_equal_to => 0 }
  validates :wool, :numericality => { :greater_than_or_equal_to => 0 }
  validates :ore, :numericality => { :greater_than_or_equal_to => 0 }
  validates :passcode, :uniqueness => true

  def cards
    return self.wood + self.brick + self.wheat + self.wool + self.ore
  end
end
