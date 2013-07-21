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

  def get_resource(resource)
    case resource
      when ResourceEnums::WOOD
        return self.wood
      when ResourceEnums::BRICK
        return self.brick
      when ResourceEnums::WHEAT
        return self.wheat
      when ResourceEnums::WOOL
        return self.wool
      when ResourceEnums::ORE
        return self.ore
    end
  end

  def set_resource(resource, amount)
    case resource
      when ResourceEnums::WOOD
        self.wood = amount
      when ResourceEnums::BRICK
        self.brick = amount
      when ResourceEnums::WHEAT
        self.wheat = amount
      when ResourceEnums::WOOL
        self.wool = amount
      when ResourceEnums::ORE
        self.ore = amount
    end
  end
end
