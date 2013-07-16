# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
GotWood::Application.initialize!

ActiveSupport::Inflector.inflections do |inflect|
  inflect.irregular 'vertex', 'vertices'
end
