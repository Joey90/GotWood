class PortConnection < ActiveRecord::Base
  # attr_accessible :title, :body
  
  belongs_to :vertex
  belongs_to :port
  
end
