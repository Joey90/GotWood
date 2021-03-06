# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130725114232) do

  create_table "edges", :force => true do |t|
    t.integer  "edge_id"
    t.boolean  "road"
    t.integer  "team"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "edges_vertices", :id => false, :force => true do |t|
    t.integer "edge_id"
    t.integer "vertex_id"
  end

  create_table "players", :force => true do |t|
    t.integer  "team"
    t.integer  "wood"
    t.integer  "brick"
    t.integer  "wheat"
    t.integer  "wool"
    t.integer  "ore"
    t.string   "passcode",     :limit => 6
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
    t.string   "name"
    t.integer  "army"
    t.boolean  "largest_army"
    t.boolean  "longest_road"
  end

  create_table "ports", :force => true do |t|
    t.integer  "port_id"
    t.integer  "resource"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "ports_vertices", :id => false, :force => true do |t|
    t.integer "port_id"
    t.integer "vertex_id"
  end

  create_table "tiles", :force => true do |t|
    t.integer  "tile_id"
    t.integer  "resource"
    t.integer  "dice_number"
    t.boolean  "robber"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "tiles_vertices", :id => false, :force => true do |t|
    t.integer "tile_id"
    t.integer "vertex_id"
  end

  create_table "vertices", :force => true do |t|
    t.integer  "vertex_id"
    t.integer  "building"
    t.integer  "team"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
